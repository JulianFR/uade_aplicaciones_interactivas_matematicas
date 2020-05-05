import React from 'react';
import './SumaRestaPie.css';
import { PieProps } from './SumaRestaPie.model';
import { Link } from 'react-router-dom';

export default (props: PieProps) => {

  function dibujarIntentos() {
    const huevos: string[] = [];
    while (huevos.length < props.intentos) { huevos.push("huevo_entero"); }
    while (huevos.length < 3) { huevos.push("huevo_roto"); }
    return (
      <ul className="pie__intentos-huevos">
        {huevos.map(h => <img className="pie__intentos-huevo" src={`/${h}.png`} alt={`Un ${h.replace("_", " ")}`}></img>)}
      </ul>
    );
  }

  return (
    <div className="pie">
      <div className="pie__estado">
        <p className="pie__tiempo-numero">TIEMPO RESTANTE: {props.tiempo}</p>
        {/* <div className="pie__tiempo-barra pie__tiempo-barra--fondo">
      <span className="pie__tiempo-barra pie__tiempo-barra--restante"></span>
    </div> */}
    <div className="pie__intentos">
    <p>INTENTOS:</p>
        {dibujarIntentos()}
    </div>
      </div>
      <Link className="pie__boton" to="/principal">Volver al Menú Principal</Link>
    </div>
  );
}