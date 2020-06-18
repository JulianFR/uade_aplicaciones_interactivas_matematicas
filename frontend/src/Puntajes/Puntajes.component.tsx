import React, { Component, Fragment } from "react";
import { PuntajesService } from "./Puntajes.service";
import "./Puntajes.css";
import { Link } from "react-router-dom";
import { PuntajesState } from "./Puntajes.model";
import { SesionService } from "../Sesion/Sesion.service";
import ModalComponent from "../UI/Modal/Modal.component";

export default class PuntajesComponent extends Component {
  servicio = new PuntajesService();
  state: PuntajesState = {
    mostrarPuntajesPorJuego: false,
    estado: "",
    puntajes: [],

  };

  constructor(props: any) {
    super(props);

    this.dibujarPuntaje = this.dibujarPuntaje.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({ estado: "Recuperando las puntuaciones..." });
      this.setState({ puntajes: await this.servicio.obtenerPuntajes() });
    } finally {
      this.setState({ estado: "" })
    }
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

  render() {
    return (
      <div className="mejores-puntajes">
        {this.state.estado
          ? <ModalComponent> <p className="juego__texto">{this.state.estado || "Cargando..."}</p> </ModalComponent>
          : <Fragment>
            <h1 className="mejores-puntajes__titulo">Mejores Puntajes</h1>
            <ul className="mejores-puntajes__tipo">
              <li className="mejores-puntajes__boton" onClick={() => this.setState({ mostrarPuntajesPorJuego: false })}>Total</li>
              <li className="mejores-puntajes__boton" onClick={() => this.setState({ mostrarPuntajesPorJuego: true })}>Por Juego</li>
            </ul>
            {this.state.mostrarPuntajesPorJuego
              ? this.state.puntajes
                .filter(p => p?.juego !== "todos")
                .map((puntaje, indice: number) =>
                  <ol key={indice} className="mejores-puntajes__puntajes">
                    <h2>{puntaje?.juego}</h2>
                    {
                      this.state.puntajes
                        .find(p => p?.juego === puntaje?.juego)?.puntajes
                        .map((puntaje: any, indice: number) => this.dibujarPuntaje(puntaje, indice))
                    }
                  </ol>)
              : <ol className="mejores-puntajes__puntajes">
                {
                  this.state.puntajes
                    .find(p => p?.juego === "todos")?.puntajes
                    .map((puntaje: any, indice: number) => this.dibujarPuntaje(puntaje, indice))
                }
              </ol>
            }
            <Link className="mejores-puntajes__boton" to={SesionService.obtenerSesionId() ? "/principal" : "/"}>Volver al Menú Principal</Link>
          </Fragment>}
      </div>
    )
  }
};