import React from 'react';
import styles from './Card_Producto_F_Stock.module.css';

const Card = (props) => {
    const { id, nombre, img, precio } = props;
    return (
        <div className={styles.ContenedorCard}>
            <div className={styles.ContenedorImagen}>
                <img src={img} alt={nombre} className={styles.Imagen}/>
            </div>
            <div className={styles.ContenedorInfo}>
                <p>{nombre}</p>
                <p>${precio}</p>
            </div>
        </div>
    )
}

export default Card;