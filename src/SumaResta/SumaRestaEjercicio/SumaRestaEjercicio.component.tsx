import React from 'react';
import './SumaRestaEjercicio.css';
import * as servicio from './SumaRestaEjercicio.service';
import Numero from './SumaRestaEjercicioNumero/SumaRestaEjercicioNumero';
import Operador from './SumaRestaEjercicioOperador/SumaRestaEjercicioOperador.component';
import { EjercicioProps, SumaRestaEjercicioIncognita } from './SumaRestaEjercicio.model';

export default (props: EjercicioProps) => {
  const foco = React.createRef<HTMLDivElement>();

  function enfocar() {
    foco.current?.focus();
  };

  function procesarEntrada(event: React.KeyboardEvent) {
    const entrada = servicio.leerNumero(event.key, props.ejercicio.entrada.toString());

    if (entrada !== props.ejercicio.entrada) {
      props.cambio(props.id, props.ejercicio.cambiarEntrada(entrada));
    }
  };

  function dibujarNumero(tipo: SumaRestaEjercicioIncognita) {
    let clase = "ejercicio__";

    switch (tipo) {
      case "operandoA": clase += "operando-a"; break;
      case "operandoB": clase += "operando-b"; break;
      case "resultado": clase += "resultado"; break;
    };

    return <div className={clase}>
      {props.ejercicio.incognita === tipo
        ? <div className={props.ejercicio.estado === "correcto" ? "" : "ejercicio__incognita"} tabIndex={0} ref={foco} onKeyDown={procesarEntrada}>
          <Numero numero={props.ejercicio.entrada === "" ? null : +props.ejercicio.entrada}></Numero>
        </div>
        : <Numero numero={props.ejercicio[tipo]}></Numero>}
    </div>
  };

  const clase = "ejercicio" + (props.ejercicio.estado !== "nuevo" ? ` ejercicio--${props.ejercicio.estado}` : "");

  return (
    <div className={clase} onClick={enfocar}>
      {dibujarNumero('operandoA')}
      <div className="ejercicio__operador">
        <Operador operador={props.ejercicio.operador}></Operador>
      </div>
      {dibujarNumero('operandoB')}
      <div className="ejercicio__igual">
        <img src="=.png" alt="El signo '='"></img>
      </div>
      {dibujarNumero('resultado')}
    </div>
  );
};
