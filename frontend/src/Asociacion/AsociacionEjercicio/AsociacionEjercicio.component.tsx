import React from 'react';
import './AsociacionEjercicio.css';
import * as servicio from './AsociacionEjercicio.service';
import Numero from './AsociacionEjercicioNumero/AsociacionEjercicioNumero';
import Operador from './AsociacionEjercicioOperador/AsociacionEjercicioOperador.component';
import { EjercicioProps, SumaRestaEjercicioIncognita } from './AsociacionEjercicio.model';
export default (props: EjercicioProps) => {
  const foco = React.createRef<HTMLDivElement>();
  const imagenes = ["cookie1", "cookie2", "cookie3", "cookie4", "cookie5", "cookie6"];

  function enfocar() {
    foco.current?.focus();
  };

  function procesarEntrada(event: React.KeyboardEvent) {
    const entrada = servicio.leerNumero(event.key, props.ejercicio.entrada.toString());

    if (entrada !== props.ejercicio.entrada) {
      props.cambio(props.id, props.ejercicio.cambiarEntrada(entrada));
    }
  };
  function dibujarImagenes() {
    /*
    let numero;
    for (let i = 0; i < 3; i++){
      numero = Math.floor(Math.random() * 4);
      seleccionadas[i] = imagenes[numero];
      console.log(seleccionadas[i]);
  }*/
    if (props.id == 0) {
      return <div className="ejercicio ejercicio__imagen">
        <div><img src={"/cookie1.png"} alt=""></img> <img src="/=.png" alt="El signo '='"></img> <Numero numero={props.ejercicio.operandoA}></Numero></div>
        <div><img src={"/cookie2.png"} alt=""></img> <img src="/=.png" alt="El signo '='"></img> <Numero numero={props.ejercicio.operandoB}></Numero></div>
      </div>;
    };
    if (props.id == 1) {
      return <div className="ejercicio ejercicio__imagen">

        <div><img src={"/cookie3.png"} alt=""></img> <img src="/=.png" alt="El signo '='"></img> <Numero numero={props.ejercicio.operandoA}></Numero></div>
        <div><img src={"/cookie4.png"} alt=""></img> <img src="/=.png" alt="El signo '='"></img> <Numero numero={props.ejercicio.operandoB}></Numero></div>

      </div>;
    };
    if (props.id == 2) {
      return <div className="ejercicio ejercicio__imagen">
        <div><img src={"/cookie5.png"} alt=""></img> <img src="/=.png" alt="El signo '='"></img> <Numero numero={props.ejercicio.operandoA}></Numero></div>
        <div><img src={"/cookie6.png"} alt=""></img> <img src="/=.png" alt="El signo '='"></img> <Numero numero={props.ejercicio.operandoB}></Numero></div>
      </div>;
    };if (props.id == 3) {
      return <div className="ejercicio ejercicio__imagen">
        <div><img src={"/cookie7.png"} alt=""></img> <img src="/=.png" alt="El signo '='"></img> <Numero numero={props.ejercicio.operandoA}></Numero></div>
        <div><img src={"/cookie8.png"} alt=""></img> <img src="/=.png" alt="El signo '='"></img> <Numero numero={props.ejercicio.operandoB}></Numero></div>
      </div>;
    };
    if (props.id == 4) {
      return <div className="ejercicio ejercicio__imagen">
        <div><img src={"/cookie9.png"} alt=""></img> <img src="/=.png" alt="El signo '='"></img> <Numero numero={props.ejercicio.operandoA}></Numero></div>
        <div><img src={"/cookie10.png"} alt=""></img> <img src="/=.png" alt="El signo '='"></img> <Numero numero={props.ejercicio.operandoB}></Numero></div>
      </div>;
    };

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
  function decidirImagenA(id: number) {
    if (id == 0)
      return <img src={"/cookie1.png"} alt=""></img>
    if (id == 1)
      return <img src={"/cookie3.png"} alt=""></img>
    if (id == 2)
      return <img src={"/cookie5.png"} alt=""></img>
    if (id == 3)
      return <img src={"/cookie7.png"} alt=""></img>
   if (id ==4) 
      return <img src={"/cookie9.png"} alt=""></img>
    

  }
  function decidirImagenB(id: number) {
    if (id == 0) {
      return <img src={"/cookie2.png"} alt=""></img>
    } else if (id == 1) {
      return <img src={"/cookie4.png"} alt=""></img>
    } else if (id == 2) {
      return <img src={"/cookie6.png"} alt=""></img>
    } else if (id == 3){
      return <img src={"/cookie8.png"} alt=""></img>
    } else if (id ==4) {
      return <img src={"/cookie10.png"} alt=""></img>
    }


  }
  const clase = "ejercicio" + (props.ejercicio.estado !== "nuevo" ? ` ejercicio--${props.ejercicio.estado}` : "");

  return (

    <div>
      {dibujarImagenes()}
      <div className={clase} onClick={enfocar}>
        {decidirImagenA(props.id)}

        <div className="ejercicio__operador">
          <Operador operador={props.ejercicio.operador}></Operador>
        </div>
        {decidirImagenB(props.id)}

        <div className="ejercicio__igual">
          <img src="/=.png" alt="El signo '='"></img>
        </div>
        {dibujarNumero('resultado')}
      </div>
    </div>
  );
};
