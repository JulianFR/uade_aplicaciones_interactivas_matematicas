import React from 'react';
import { EjercicioDigito } from './SumaRestaEjercicioNumeroDigito.model';

export default (props: { digito: EjercicioDigito}) => <img src={props.digito + '.png'} alt={`El dígito '${props.digito}'`}></img>