import React from 'react';
import './Acceso.css';
import { Link } from 'react-router-dom';
import { UsuarioService } from '../Usuario/Usuario.service';

export default () => {
  const nombre = React.createRef<HTMLInputElement>()

  function comenzar() {
    UsuarioService.crearUsuario(nombre.current?.value || "Max");
  }

  return (
    <div className="acceso">
      <div className="acceso__formulario">
        <h1 className="acceso__formulario-titulo">¡Bienvenido!</h1>
        <input ref={nombre} type="text" placeholder="Ingresá tu Nombre" className="acceso__formulario-nombre" />
        <Link className="acceso__formulario-boton" to="/principal" onClick={comenzar}>Comenzar</Link>
      </div>
    </div>
  );
}
