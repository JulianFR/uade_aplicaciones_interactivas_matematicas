import React from 'react';
import './SumaRestaPie.css';
import { PieProps } from './SumaRestaPie.model';
import { Link } from 'react-router-dom';

export default (props: PieProps) => (
  <div className="pie">
    <div className="pie__estado">
    <p className="pie__tiempo-numero">TIEMPO RESTANTE: {props.tiempo}</p>
    {/* <div className="pie__tiempo-barra pie__tiempo-barra--fondo">
      <span className="pie__tiempo-barra pie__tiempo-barra--restante"></span>
    </div> */}
    <p className="pie__intentos">INTENTOS: {props.intentos}</p>
    </div>
    <Link className="pie__boton" to="/principal">Volver al Menú Principal</Link>
  </div>
);