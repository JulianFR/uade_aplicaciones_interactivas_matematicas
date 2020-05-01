import React, { Component } from 'react';
import Ejercicio from './Ejercicio/SumaRestaEjercicio.component';
import './SumaResta.css';
import Pie from './Pie/Pie';
import Encabezado from './Encabezado/Encabezado';
import { SumaRestaState, JuegoNiveles } from './SumaResta.model';
import { SumaRestaEjercicio } from './Ejercicio/SumaRestaEjercicio.model';

export default class SumaRestaComponent extends Component {
  readonly state: SumaRestaState = {
    nivel: 1,
    tiempo: 120,
    intentos: 3,
    puntaje: 0,
    ejercicios: [
      new SumaRestaEjercicio(),
      new SumaRestaEjercicio(),
      new SumaRestaEjercicio()
    ]
  };
  readonly juego = "Sumas y Restas";

  contador: NodeJS.Timeout = setTimeout(() => { }, 0);

  constructor(props: any) {
    super(props);

    this.manejarEjercicio = this.manejarEjercicio.bind(this);
    this.calificar = this.calificar.bind(this);
    this.manejarTiempo = this.manejarTiempo.bind(this);
  }

  componentDidMount() {
    this.contador = setInterval(this.manejarTiempo, 1000);
  }

  manejarTiempo() {
    if (this.state.tiempo > 0) {
      this.setState({ tiempo: this.state.tiempo - 1 });
      if (this.state.intentos === 0) {
        clearTimeout(this.contador);
      }
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

  calificar() {
    if (this.state.intentos > 0) {
      let correcto = true;
      let intentos = this.state.intentos;
      let puntaje = this.state.puntaje;
      let ejercicios = [...this.state.ejercicios];
      let nivel = this.state.nivel;
      let tiempo = this.state.tiempo;

      for (let ejercicio = 0; ejercicio < ejercicios.length; ejercicio++) {
        if (ejercicios[ejercicio].estado !== "correcto") {
          ejercicios[ejercicio] = ejercicios[ejercicio].corregir();
          if (ejercicios[ejercicio].estado !== "correcto") {
            correcto = false;
          } else {
            puntaje += Math.floor(intentos / 3 * this.state.tiempo * this.state.nivel);
          }
        }
      }

      if (!correcto) {
        intentos -= 1;
      } else {
        if (nivel < 3) {
          ejercicios = [];
          nivel++;
          intentos = 3;
          tiempo = 120;
          for (let cantidad = 3 + this.state.nivel; cantidad > 0; cantidad--) { ejercicios.push(new SumaRestaEjercicio(nivel as JuegoNiveles)); }
        } else {
          alert("Ganaste pipa, tu puntuación es: " + this.state.puntaje);
        }
      }

      this.setState({ ejercicios, intentos, puntaje, tiempo, nivel });
    }
  }

  render() {
    return (
      <div className="juego">
        <Encabezado juego={this.juego} puntaje={this.state.puntaje} nivel={this.state.nivel}></Encabezado>
        {this.state.ejercicios.map((e, i) => <Ejercicio key={i} id={i} cambio={this.manejarEjercicio} ejercicio={e}></Ejercicio>)}
        <button className="juego__boton" type="button" onClick={this.calificar}>Calificar</button>
        <Pie tiempo={this.state.tiempo} intentos={this.state.intentos}></Pie>
      </div>
    );
  }
}