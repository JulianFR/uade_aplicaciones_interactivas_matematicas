import React from 'react';
import './Acceso.css';

export default () => (
  <div className="acceso">
    <div className="acceso__formulario">
      <h1 className="acceso__formulario-titulo">¡Bienvenido!</h1>
      <input type="text" placeholder="Ingresá tu Nombre" className="acceso__formulario-nombre" />
      <button className="acceso__formulario-boton">Comenzar</button>
    </div>
  </div>
)