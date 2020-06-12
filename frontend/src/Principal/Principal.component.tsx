import React, { Component, Fragment } from 'react';
import './Principal.css';
import '../App.css';
import { SesionService } from '../Sesion/Sesion.service';
import { Link } from 'react-router-dom';
import ModalComponent from '../UI/Modal/Modal.component';

export default class extends Component<any> {
  readonly state = {
    ocupado: false,
    mostrarDespedida: false,
    posicion: 0,
    puntos: 0
  };

  readonly avatar: string;
  readonly jugador: string;

  constructor(props: any) {
    super(props);

    this.avatar = props.avatar;
    this.jugador = props.jugador;
    this.salir = this.salir.bind(this);
  }

  async salir() {
    try {
      this.setState({ ocupado: true });

      const { posicion, puntos } = { ...await SesionService.destruirSesion() };

      this.setState({ ocupado: true, mostrarDespedida: true, posicion, puntos, });
    } catch (error) {
      window.location.href = "/";
    }
  }

  render() {
    return (
      <div className="principal">
        {this.state.ocupado
          ? <ModalComponent>
            <p className="juego__texto">Subiendo tu puntuación...</p>
          </ModalComponent>
          : null}
        {this.state.mostrarDespedida
          ? <ModalComponent>
            <div className="flex--vertical">
              <h1 className="juego__texto">¡Nos vemos!</h1>
              <p className="juego__texto texto--centrado">{"Anotaste " + this.state.puntos + " puntos en total"}</p>
              {this.state.posicion < 11
                ? <Fragment>
                  <h2 className="juego__texto">¡Felicidades!</h2>
                  <img src="/medalla.png" alt="Medalla" />
                  <p className="juego__texto texto--centrado">{"Alcanzaste la posición número " + this.state.posicion}</p>
                </Fragment>
                : null}
              <Link to="/puntajes">
                <button className="principal__opcion boton--azul">Mejores Puntajes</button>
              </Link>
              < Link to="/">
                <button className="principal__opcion boton--azul">Salir</button>
              </Link>
            </div>
          </ModalComponent>
          : null
        }
        <div className="principal__avatar" style={{ backgroundImage: `url("/${this.avatar}.png")` }}></div>
        <h1 className="principal__nombre">{this.jugador}</h1>
        <h3 className="principal__subtitulo">¿Qué te gustaría practicar hoy?</h3>
        <ul className="principal__juegos">
          <li>
            <Link className="principal__juego" to="/juegos/sumas-y-restas">
              <h4>Sumas y Restas</h4>
              <img className="principal__juego-imagen" src="sumas-y-restas.png" alt="Sumas y Restas" />
              <p>Tu mejor puntuación</p>
              <p>{SesionService.obtenerPuntaje("Sumas y Restas")}</p>
            </Link>
          </li>
          <li>
            <Link className="principal__juego" to="/juegos/asociacion">
              <h4>Asociación</h4>
              <img className="principal__juego-imagen" src="" alt="" />
              <p>Tu mejor puntuación</p>
              <p>{0}</p>
            </Link>
          </li>
          <li className="principal__juego">
            <h4>Juego 3</h4>
            <img className="principal__juego-imagen" src="" alt="" />
            <p>Tu mejor puntuación</p>
            <p>{0}</p>
          </li>
        </ul>
        <Link className="principal__opcion" to="/puntajes">Mejores Puntuaciones</Link>
        <button className="principal__opcion" onClick={async () => await this.salir()}>Salir</button>
      </div>
    );
  }
}