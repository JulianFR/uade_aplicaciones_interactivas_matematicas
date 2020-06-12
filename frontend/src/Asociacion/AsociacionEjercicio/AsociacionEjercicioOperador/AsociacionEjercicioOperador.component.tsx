
import React from 'react';
import { SumaRestaEjercicioOperador } from '../AsociacionEjercicio.model';

export default (props: { operador: SumaRestaEjercicioOperador}) => <img src={`/${props.operador}.png`} alt={`El operador ${props.operador}`} style={{height: 50}}></img>