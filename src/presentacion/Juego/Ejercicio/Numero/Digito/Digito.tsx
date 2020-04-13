import React from 'react';
import { EjercicioDigito } from './Digito.model';

export default (props: { digito: EjercicioDigito}) => <img src={props.digito + '.png'} alt={"El dígito " + props.digito} style={{height: 50}}></img>