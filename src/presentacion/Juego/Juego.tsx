import React, { Component } from 'react';
import Ejercicio from './Ejercicio/Ejercicio';
import './Juego.css';

export default class Juego extends Component {
  readonly state = {
    ejercicios: [
      { respuesta: "", entrada: "", color: "gris" },
      { respuesta: "", entrada: "", color: "gris" },
      { respuesta: "", entrada: "", color: "gris" },
      { respuesta: "", entrada: "", color: "gris" },
      { respuesta: "", entrada: "", color: "gris" }
    ]
  };

  constructor(props: any) {
    super(props);

    this.manejarCambios = this.manejarCambios.bind(this);
    this.calificar = this.calificar.bind(this);
  }

  manejarCambios(ejercicio: number, entrada: string, respuesta: string) {
    this.state.ejercicios[ejercicio] = { entrada, respuesta, color: this.state.ejercicios[ejercicio].color };
  }

  calificar() {
    let correctas = 0;
    const ejercicios = [...this.state.ejercicios];

    for (const ejercicio of ejercicios) {
      if (ejercicio.entrada === ejercicio.respuesta) {
        correctas++;
        ejercicio.color = "verde";
      } else {
        ejercicio.color = "rojo";
      }
    }

    this.setState({ ejercicios });
  }

  render() {
    return (
      <div>
        <Ejercicio id={0} cambio={this.manejarCambios} color={this.state.ejercicios[0].color}></Ejercicio>
        <Ejercicio id={1} cambio={this.manejarCambios} color={this.state.ejercicios[1].color}></Ejercicio>
        <Ejercicio id={2} cambio={this.manejarCambios} color={this.state.ejercicios[2].color}></Ejercicio>
        <Ejercicio id={3} cambio={this.manejarCambios} color={this.state.ejercicios[3].color}></Ejercicio>
        <Ejercicio id={4} cambio={this.manejarCambios} color={this.state.ejercicios[4].color}></Ejercicio>
        <button className="juego__boton" type="button" onClick={this.calificar}>Calificar</button>
      </div>
    );
  }
}