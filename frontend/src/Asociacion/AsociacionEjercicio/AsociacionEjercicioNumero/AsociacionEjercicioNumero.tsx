import React from 'react';
import Digito from './AsociacionEjercicioNumeroDigito/AsociacionEjercicioNumeroDigito';
import { EjercicioDigito } from './AsociacionEjercicioNumeroDigito/AsociacionEjercicioNumeroDigito.model';
import { obtenerDigitos } from './AsociacionEjercicioNumero.service';
import { SumaRestaEjercicioNumeroProps } from './AsociacionEjercicioNumero.model';

export default (props: SumaRestaEjercicioNumeroProps) => <>
  {obtenerDigitos(props.numero)?.map((digito: EjercicioDigito, indice) => <Digito key={indice} digito={digito}></Digito>)}
</>

