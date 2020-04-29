import React, { Component } from 'react';
import './Ejercicio.css';
import * as servicio from './Ejercicio.service';
import Numero from './Numero/Numero';
import Operador from './Operador/Operador';
import { EjercicioOperador, EjercicioIncognita } from './Ejercicio.model';

export default class Ejercicio extends Component<any> {
  readonly operador: EjercicioOperador = servicio.determinarOperador();
  readonly incognita: EjercicioIncognita = servicio.determinarIncognita(this.operador);
  readonly resultado: number = Math.floor(Math.random() * 1000);
  readonly operandoA: number;
  readonly operandoB: number;
  readonly foco: any = React.createRef();
  readonly state = { entrada: "" };

  constructor(props: any) {
    super(props);

    [this.operandoA, this.operandoB] = servicio.determinarOperandos(this.resultado, this.operador);
    this.actualizarResultado(this.state.entrada);
  }

  procesarEntrada(event: React.KeyboardEvent) {
    const entrada = servicio.leerNumero(event.key, this.state.entrada);

    if (this.state.entrada !== entrada) {
      this.setState({ entrada });
      this.actualizarResultado(entrada);
    }
  }

  actualizarResultado(entrada: string) {
    this.props.cambio(this.props.id, entrada, this[this.incognita].toString());
  }

  enfocar() {
    (this.foco.current as HTMLElement).focus();
  }

  dibujarNumero(incognita: string, tipo: "operandoA" | "operandoB" | "resultado", numero: number) {
    let clase = "ejercicio__";

    switch (tipo) {
      case "operandoA": clase += "operando-a"; break;
      case "operandoB": clase += "operando-b"; break;
      case "resultado": clase += "resultado"; break;
    };

    return <div className={clase}>
      {incognita === tipo
        ? <div className={this.props.color === "verde" ? "" : "ejercicio__incognita"} tabIndex={0} ref={this.foco} onKeyDown={this.procesarEntrada.bind(this)}>
          <Numero numero={this.state.entrada}></Numero>
        </div>
        : <Numero numero={numero}></Numero>}
    </div>
  }

  render() {
    const clase = "ejercicio" + (this.props.color !== "gris" ? ` ejercicio--${this.props.color}` : "");

    return <div className={clase} onClick={this.enfocar.bind(this)}>
      {this.dibujarNumero(this.incognita, 'operandoA', this.operandoA)}
      <div className="ejercicio__operador">
        <Operador operador={this.operador}></Operador>
      </div>
      {this.dibujarNumero(this.incognita, 'operandoB', this.operandoB)}
      <div className="ejercicio__igual">
        <img src="=.png" alt="El signo '='"></img>
      </div>
      {this.dibujarNumero(this.incognita, 'resultado', this.resultado)}
    </div>
  }
};
