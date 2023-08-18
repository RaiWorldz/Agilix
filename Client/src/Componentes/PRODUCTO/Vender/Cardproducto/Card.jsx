import React, { useState } from 'react';
import styles from './Card.module.css';
import { useDispatch  } from 'react-redux';
import { agregarAlCarrito } from '../../../../Redux/carritoDeComprasSlice';

const Card = ({ id, nombre, img, precio, stock }) => {
    const [cantidad, setCantidad] = useState(1);
    const dispatch = useDispatch();
  
    const handleCantidadChange = (event) => {
        const newCantidad = parseInt(event.target.value);
        if (!isNaN(newCantidad) && newCantidad >= 0) {
            setCantidad(newCantidad);
        } else {
            setCantidad("");
        }
    };

   
    const handleAgregarAlCarrito = () => {
        if (cantidad > 0 && cantidad <= stock) {
          dispatch(
            agregarAlCarrito({
              producto: { id, nombre, img, precio, stock },
              cantidad,
            })
          );
          setCantidad(0);
        } else if (cantidad > stock) {
          alert('La cantidad seleccionada es mayor al stock disponible');
        } else if (cantidad=== 0){
            alert('La cantidad del stock no puede ser cero')
        }
      };
  
  
    return (
        <div  className={styles.ContenedorCard} >
           
                <div className={styles.Contenedorinpunt}>
                    <div className={styles.ContenedorImg}>
                        <img src={img} alt={nombre} />
                    </div>
                    <div className={styles.ContenedorInfo}>
                        <h3>{nombre}</h3>
                        <p>Precio: ${precio}</p>
                        <p>Disponible: {stock}</p>
                    </div>
                    <div className={styles.ContenedorBotonStock}>
                        <input
                            type="number"
                            value={cantidad}
                            onChange={handleCantidadChange}
                            min="0"
                        />
                    </div>
                    <div className={styles.ContenedorBotones}>
                        <button className={styles.btnAgregar} onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
                    </div>
                </div>
        </div>
    );
}

export default Card;