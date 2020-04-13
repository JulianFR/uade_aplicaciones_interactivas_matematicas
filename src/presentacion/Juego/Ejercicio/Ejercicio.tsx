import React from 'react';
import './Ejercicio.css';
import * as servicio from './Ejercicio.service';
import Numero from './Numero/Numero';
import Operador from './Operador/Operador';

export default () => {
  const operador = servicio.determinarOperador();
  const incognita = servicio.determinarIncognita(operador);
  let [resultado, operandoA, operandoB] = servicio.determinarResultado(operador);

  if (!operandoA) {
    [operandoA, operandoB] = [...servicio.determinarOperandos(resultado, operador)];
  }

  console.log(operandoA + " " + operador + " " + operandoB + " = " + resultado);

  return <div className="ejercicio">
    {incognita === 'operandoA' ? <input className='ejercicio__elemento'></input> : <Numero numero={operandoA}></Numero>}
    {incognita === 'operacion' ? <input className='ejercicio__elemento'></input> : <Operador operador={operador}></Operador>}
    {incognita === 'operandoB' ? <input className='ejercicio__elemento'></input> : <Numero numero={operandoB}></Numero>}
    <img src='=.png' alt='El signo =' style={{height: 50}}></img>
    {incognita === 'resultado' ? <input className='ejercicio__elemento'></input> : <Numero numero={resultado}></Numero>}
  </div>
};