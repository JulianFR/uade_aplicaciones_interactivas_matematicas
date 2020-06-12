import React, { Component, Fragment } from "react";
import { PuntajesService } from "./Puntajes.service";
import "./Puntajes.css";
import { Link } from "react-router-dom";

export default class PuntajesComponent extends Component {
  servicio = new PuntajesService();
  state = {
    mostrarPuntajesPorJuego: false,
    puntajes: {
      todos: []
    },
  };

  constructor(props: any) {
    super(props);

    this.obtejerPuntajesPorJuego = this.obtejerPuntajesPorJuego.bind(this);
    this.dibujarPuntaje = this.dibujarPuntaje.bind(this);
  }

  async componentDidMount() {
    const puntajes = await this.servicio.obtenerPuntajes();

    this.setState({ puntajes });
  }

  dibujarPuntaje(puntaje: any, indice: number) {
    return (
      <div key={indice} className="mejores-puntajes__puntaje">
        <p className="mejores-puntajes__puntaje-puntos">{puntaje.puntos}</p>
        <p className="mejores-puntajes__puntaje-jugador">{puntaje.jugador}</p>
        <div className="mejores-puntajes__puntaje-avatar" style={{ backgroundImage: `url(/${puntaje.avatar}.png)` }}></div>
      </div>
    );
  }

  obtejerPuntajesPorJuego() {
    const juegos = Object.keys(this.state.puntajes);

    juegos.splice(juegos.indexOf("todos"), 1);

    return juegos;
  }

  render() {
    return (
      <div className="mejores-puntajes">
        <h1 className="mejores-puntajes__titulo">Mejores Puntajes</h1>
        <ul className="mejores-puntajes__tipo">
          <li className="mejores-puntajes__boton" onClick={() => this.setState({ mostrarPuntajesPorJuego: false })}>Total</li>
          <li className="mejores-puntajes__boton" onClick={() => this.setState({ mostrarPuntajesPorJuego: true })}>Por Juego</li>
        </ul>
        {this.state.mostrarPuntajesPorJuego
          ? this.obtejerPuntajesPorJuego().map((juego: string, indice: number) =>
            <ol key={indice} className="mejores-puntajes__puntajes">
              <h2>{juego}</h2>
              {
                //@ts-ignore
                this.state.puntajes[juego].map((puntaje: any, indice: number) => this.dibujarPuntaje(puntaje, indice))
              }
            </ol>)
          : <ol className="mejores-puntajes__puntajes">
            {this.state.puntajes.todos.map((puntaje: any, indice: number) => this.dibujarPuntaje(puntaje, indice))}
          </ol>
        }

        <Link className="mejores-puntajes__boton" to="/principal">Volver al Menú Principal</Link>
      </div>
    )
  }
};