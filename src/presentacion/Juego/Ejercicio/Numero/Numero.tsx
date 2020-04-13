import React from 'react';
import Digito from './Digito/Digito';
import { EjercicioDigito } from './Digito/Digito.model';

export default (props: any) => <>
  {obtenerDigitos(props.numero).map((digito: EjercicioDigito, indice) => <Digito key={indice} digito={digito}></Digito>)}
</>

function obtenerDigitos(unNumero: number): EjercicioDigito[] {
  return unNumero.toString().split('') as EjercicioDigito[];
}