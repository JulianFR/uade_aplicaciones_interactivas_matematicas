import React from "react";
import { PuntajesService } from "./Puntajes.service";
import "./Puntajes.css";
import { Link } from "react-router-dom";

export default () => {
  const servicio = new PuntajesService();
  const puntuaciones = servicio.obtenerPuntajes();
  const mejoresPuntajes = servicio.obtenerMejores(puntuaciones)

  function dibujarPuntaje(puntaje: any, indice: number) {
    return (
      <div key={indice} className="mejores-puntajes__puntaje">
        <p className="mejores-puntajes__puntaje-puntos">{puntaje.puntos}</p>
        <p className="mejores-puntajes__puntaje-jugador">{puntaje.jugador}</p>
        <div className="mejores-puntajes__puntaje-avatar" style={{backgroundImage: `url(/${puntaje.avatar}.png)`}}></div>
      </div>
    );
  }

  return (
    <div className="mejores-puntajes">
      <h1 className="mejores-puntajes__titulo">Mejores Puntajes</h1>
      <ul className="mejores-puntajes__tipo">
        <li className="mejores-puntajes__boton">Total</li>
        <li className="mejores-puntajes__boton">Por Juego</li>
      </ul>
      <ol className="mejores-puntajes__puntajes">
        {mejoresPuntajes.map((puntaje, indice) => dibujarPuntaje(puntaje, indice))}
      </ol>
      <Link className="mejores-puntajes__boton" to="/principal">Volver al Menú Principal</Link>
    </div>
  )
};