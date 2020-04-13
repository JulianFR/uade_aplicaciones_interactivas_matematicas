
import React from 'react';
import { EjercicioOperador } from '../Ejercicio.model';

export default (props: { operador: EjercicioOperador}) => <img src={props.operador + '.png'} alt={"El operador " + props.operador} style={{height: 50}}></img>