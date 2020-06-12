import React, { Component, Fragment } from 'react';
import Ejercicio from './SumaRestaEjercicio/SumaRestaEjercicio.component';
import './SumaResta.css';
import Pie from '../Pie/Pie.component';
import Encabezado from '../Encabezado/Encabezado.component';
import { SumaRestaState, JuegoNiveles } from './SumaResta.model';
import { SumaRestaEjercicio } from './SumaRestaEjercicio/SumaRestaEjercicio.model';
import { SesionService } from '../../Sesion/Sesion.service';
import ModalComponent from '../../UI/Modal/Modal.component';
import { SumaRestaService } from './SumaResta.service';
import { Link } from 'react-router-dom';
import { subirPuntaje } from '../Juegos.service';

export default class SumaRestaComponent extends Component {
  private readonly servicio = new SumaRestaService;

  readonly state: SumaRestaState = this.servicio.iniciarNivel(1);
  readonly juego = "Sumas y Restas";

  contador: NodeJS.Timeout = setTimeout(() => { }, 0);

  constructor(props: any) {
    super(props);

    this.manejarEjercicio = this.manejarEjercicio.bind(this);
    this.calificar = this.calificar.bind(this);
    this.manejarTiempo = this.manejarTiempo.bind(this);
    this.reiniciar = this.reiniciar.bind(this);
  }

  componentDidMount() {
    this.contador = setInterval(this.manejarTiempo, 1000);
  }

  manejarTiempo() {
    if (this.state.tiempo > 0) {
      this.setState({ tiempo: this.state.tiempo - 1 });
    } else {
      clearTimeout(this.contador);
      this.calificar();
      if (this.state.intentos > 0) {
        this.setState({ tiempo: 120 });
        this.contador = setInterval(this.manejarTiempo, 1000);
      }
    }
  }

  manejarEjercicio(id: number, ejercicio: SumaRestaEjercicio) {
    const ejercicios = [...this.state.ejercicios];
    ejercicios[id] = ejercicio;

    this.setState({ ejercicios });
  }

  reiniciar() {
    this.setState(this.servicio.iniciarNivel(1));
    this.contador = setInterval(this.manejarTiempo, 1000);
  }

  async calificar() {
    let correcto = true;
    let puntaje = this.state.puntaje;
    let ejercicios = [...this.state.ejercicios];

    for (let ejercicio = 0; ejercicio < ejercicios.length; ejercicio++) {
      if (ejercicios[ejercicio].estado !== "correcto") {
        ejercicios[ejercicio] = ejercicios[ejercicio].corregir();
        if (ejercicios[ejercicio].estado !== "correcto") {
          correcto = false;
        } else {
          puntaje += Math.floor(this.state.intentos / 3 * this.state.tiempo * this.state.nivel);
        }
      }
    }
    if (correcto) {
      if (this.state.nivel < 3) { return this.setState(this.servicio.iniciarNivel(this.state.nivel + 1 as JuegoNiveles, puntaje)); }

      await this.subirPuntaje(puntaje);
    }

    if (this.state.intentos === 1) { await this.subirPuntaje(puntaje); }

    this.setState({ ejercicios, intentos: this.state.intentos - 1, puntaje });
  }

  async subirPuntaje(puntaje: number) {
    let posicion = 0;
    try {
      clearTimeout(this.contador);
      this.setState({ ocupado: true });
      posicion = await subirPuntaje(this.juego, puntaje, SesionService.obtenerSesionId());
    } finally {
      this.setState({ ocupado: false, seTermino: true, posicion });
    }
  }

  render() {
    return (
      <div className="juego">
        {this.state.ocupado
          ? <ModalComponent>
            <p className="juego__texto">Subiendo tu puntuación...</p>
          </ModalComponent>
          : null}
        {this.state.seTermino
          ? <ModalComponent>
            <div className="flex--vertical">
              <h1 className="juego__texto">Fin del Juego</h1>
              <div className="juego__avatar" style={{ backgroundImage: `url("/${SesionService.obtenerAvatar()}.png")` }}></div>
              <p className="juego__texto">{"Anotaste " + this.state.puntaje + " puntos"}</p>
              {this.state.posicion
                ? <Fragment>
                  <h2 className="juego__texto">¡Felicidades!</h2>
                  <p className="juego__texto texto--centrado">{"Alcanzaste la posición número " + this.state.posicion}</p>
                  <img style={{ height: "150px" }} src="/medalla.png" alt="Medalla" />
                </Fragment>
                : null}
              <button className="boton margen--arriba" onClick={this.reiniciar}>¡Otra Vez!</button>
              < Link to="/principal">
                <button className="boton margen--arriba">Menú Principal</button>
              </Link>
            </div>
          </ModalComponent>
          : null
        }
        <Encabezado juego={this.juego} puntaje={this.state.puntaje} nivel={this.state.nivel}></Encabezado>
        {this.state.ejercicios.map((e, i) => <Ejercicio key={i} id={i} cambio={this.manejarEjercicio} ejercicio={e}></Ejercicio>)}
        <button className="juego__boton" type="button" onClick={async () => await this.calificar()}>Calificar</button>
        <Pie tiempo={this.state.tiempo} intentos={this.state.intentos}></Pie>
      </div >
    );
  }
}