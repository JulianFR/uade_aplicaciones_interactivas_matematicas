import React from 'react';
import './AsociacionCabeza.css';
import { EncabezadoProps } from './Asociacion.model';

export default (props: EncabezadoProps) => (
  <header className='encabezado'>
    <p className='encabezado__juego'>JUEGO: {props.juego}</p>
    <p className="encabezado__puntaje">PUNTAJE: {props.puntaje}</p>
    <p className='encabezado__nivel'>NIVEL: {props.nivel}</p>
  </header>
)
