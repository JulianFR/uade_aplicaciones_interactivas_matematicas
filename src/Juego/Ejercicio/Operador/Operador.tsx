
import React from 'react';
import { SumaRestaEjercicioOperador } from '../SumaRestaEjercicio.model';

export default (props: { operador: SumaRestaEjercicioOperador}) => <img src={props.operador + '.png'} alt={"El operador " + props.operador} style={{height: 50}}></img>