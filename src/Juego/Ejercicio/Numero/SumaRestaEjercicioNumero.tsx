import React from 'react';
import Digito from './Digito/Digito';
import { EjercicioDigito } from './Digito/Digito.model';
import { obtenerDigitos } from './SumaRestaEjercicioNumero.service';
import { SumaRestaEjercicioNumeroProps } from './SumaRestaEjercicioNumero.model';

export default (props: SumaRestaEjercicioNumeroProps) => <>
  {obtenerDigitos(props.numero)?.map((digito: EjercicioDigito, indice) => <Digito key={indice} digito={digito}></Digito>)}
</>

