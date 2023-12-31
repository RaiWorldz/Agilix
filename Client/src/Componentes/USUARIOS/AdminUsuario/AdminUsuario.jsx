import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsuarios } from "../../../Redux/usuariosSlice";
import { NavLink } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from "./AdminUsuario.module.css";

const AdminUsuarios = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);

  useEffect(() => {
    dispatch(fetchUsuarios());
  }, [dispatch]);

  if (!usuarios.allUsuarios.length) {
    return (
      <div className={styles.buttonContainer}>
        <div className={styles.ContenedorBotonBack}>
          <NavLink to='/' className={styles.BotonBack}>
            <ArrowBackIosNewIcon className={styles.IconoBack} />
          </NavLink>
        </div>
        <button className={styles.CrearCliente}>
          <NavLink to="/crearusuario" style={{ textDecoration: "none" }}>
            Crear Usuario
          </NavLink>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.ContenedorBotonBack}>
          <NavLink to='/' className={styles.BotonBack}>
              <ArrowBackIosNewIcon className={styles.IconoBack} />
          </NavLink>
      </div>
      <h1 className={styles.tittle}>Lista de usuarios</h1>
      <button className={styles.CrearCliente}>
        <NavLink to="/crearusuario" style={{ textDecoration: "none" }}>
          Crear Usuario
        </NavLink>
      </button>
      <div className={styles.container}>
        <ol className={styles.clienteList}>
          {usuarios.allUsuarios.map((usuario) => (
            <li className={styles.clienteRow} key={usuario.id}>
              <div className={styles.clienteInfo}>
                <span className={styles.tituloPrincipal}>Nombre:</span>
                <p className={styles.nombreCliente}>
                  {usuario.nombre} {usuario.apellido}
                </p>
              </div>
              <div className={styles.clienteInfo}>
                <span className={styles.tituloPrincipal}>Apellido:</span>
                <p className={styles.telefonoCliente}>{usuario.apellido}</p>
              </div>
              <div className={styles.clienteInfo}>
                <span className={styles.tituloPrincipal}>Teléfono:</span>
                <p className={styles.telefonoCliente}>{usuario.telefono}</p>
              </div>
              <div className={styles.clienteInfo}>
                <span className={styles.tituloPrincipal}>Email:</span>
                <p className={styles.clienteEmail}>{usuario.email}</p>
              </div>
              <div className={styles.clienteInfo}>
                <span className={styles.tituloPrincipal}>DNI:</span>
                <p className={styles.clienteEmail}>{usuario.dni}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AdminUsuarios;
