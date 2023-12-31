import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ordenAlfabetico,
  ordenPorPrecio,
  filtroPorTipo,
  restablecerOrdenamientos,
  deleteProduct,

} from "../../../Redux/productSlice";
import Paginado from "./Paginado/Paginado";
import SearchBar from "./SearchBar/SearchBar";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from "./MisProductos.module.css";

const MisProductos = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [resetSeleccion, setResetSeleccion] = useState({
    ordenAlfabetico: "",
    ordenPorPrecio: "",
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  // Lista de tipos de productos
  const tipos = ["Químicos", "Consumibles", "Hogar", "Otros"];

  // Estados para el paginado
  const [currentPage, setCurrentPage] = useState(1);//pagina actual
  const [productosPorPagina, setProductosPorPagina] = useState(6);//cantidad de items por pagina
  const [order, setOrder] = useState("")//orden
  const indexLastItem = currentPage * productosPorPagina;//indice del ultimo item
  const indexFirstItem = indexLastItem - productosPorPagina;//indice del primer item

  // Handler del ordenamiento alfabetico
  const handleChange = (event) => {
    setResetSeleccion({
      ...resetSeleccion,
      ordenAlfabetico: event.target.value,
    });
    if (event.target.value === "asc" || event.target.value === "desc") {
      dispatch(ordenAlfabetico(event.target.value));
    } else {
      dispatch(ordenPorPrecio(event.target.value));
    }
  };

  // Handler del reseteo de ordenamientos
  const handleReset = () => {
    setResetSeleccion({
      ordenAlfabetico: "A_Z_predeterminado",
      ordenPorPrecio: "Precio_predeterminado",
    });
    dispatch(restablecerOrdenamientos());
  };
  const handleDelete = (productId, estado) => {
    setShowConfirmDialog(true);
    setProductIdToDelete(productId, false); 
  };
  
  const confirmDelete = (productId, estado) => {
    setShowConfirmDialog(false);
  
    dispatch(deleteProduct({ productId, estado: false })); 
  };
  const filteredProducts = product.productosFiltrados.filter(
    (prod) => prod.estado === true
  );

  const paginatedProducts = filteredProducts.slice(
    indexFirstItem,
    indexLastItem
  );//corta la cantidad de items que necesito mostrar según los indices a partir del estado global
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filtrarProductoPorTipo = (event) => {
    dispatch(restablecerOrdenamientos());
    dispatch(filtroPorTipo(event.target.value));
  }

  return (
    <div>
      <div className={styles.ContenedorBotonBack}>
        <NavLink to='/' className={styles.BotonBack}>
          <ArrowBackIosNewIcon className={styles.IconoBack} />
        </NavLink>
      </div>
      <h1 className={styles.tittle}>Listado de Productos</h1>
      <div className={styles.contenedorSearchBar}><SearchBar /></div>
      <div className={styles.contenedorSelector}>
        <select onChange={filtrarProductoPorTipo} className={styles.selectores}>
          <option disabled={true}>Filtrar Producto</option>
          <option value="todos">Tipos</option>
          <option value="frutas">Frutas</option>
          <option value="verduras">Verduras</option>
          <option value="bebidas">Bebidas</option>
          <option value="abarrotes">Abarrotes</option>
          <option value="carnes">Carnes</option>
        </select>
        <select className={styles.selectores} onChange={handleChange} value={resetSeleccion.ordenAlfabetico}>
          <option disabled={true}>Orden Alfabético</option>
          <option value="A_Z_predeterminado">Orden Alfabético</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="precioMax">Mayor Precio</option>
          <option value="precioMin">Menor Precio</option>
        </select>
        <button className={styles.buttonReset} onClick={handleReset}>Restablecer Productos</button>
      </div>

      {product.loading && <div>Cargando...</div>}
      {!product.loading && product.error ? (
        <div style={{ color: "white" }}>{product.error}</div>
      ) : null}

      {!product.loading && product.productosFiltrados ? (
        <div className={styles.contenedor}>
          {paginatedProducts.map((prod) => (
            <div className={styles.cards} key={prod.id}>
              <img className={styles.imagen} src={prod.img} />
              <div className={styles.contenedorLetras}>
              <button
                  className={styles.botonEliminar}
                  onClick={() => handleDelete(prod.id)}>x</button>
                <h1>{prod.nombre} </h1>
                <h3> ${prod.precio}</h3>
                <h3>{prod.tipo}</h3>
                {prod.stock === 0 ? (
                  <p className={styles.agotado}>Agotado</p>
                ) : (

                  <p>Stock Disponible: {prod.stock}</p>
                )}
                
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className={styles.PaginadoContainer}>
        <Paginado className={styles.Paginado}
          productosPorPagina={productosPorPagina}
          products={product.productosFiltrados}
          paginado={paginado}
          currentPage={currentPage}    />
          </div>
    
          {showConfirmDialog && (
            <div className={styles.confirmDialog}>
              <p className={styles.confirmDialogP}>¿Estás seguro de que deseas eliminar este producto?</p>
              <button className={styles.confirmDialogButton} onClick={() => confirmDelete(productIdToDelete)}>Sí, eliminar</button>
              <button className={styles.confirmDialogButton} onClick={() => setShowConfirmDialog(false)}>Cancelar</button>
            </div>
          )}
        </div>
      );
    };
export default MisProductos;
