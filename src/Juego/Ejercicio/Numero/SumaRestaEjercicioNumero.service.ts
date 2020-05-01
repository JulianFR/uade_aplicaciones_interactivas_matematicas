import { EjercicioDigito } from "./Digito/Digito.model";

export function obtenerDigitos(numero: number | null): EjercicioDigito[] | null {
  if (numero === null || numero < 0 ) { return null; }
  return numero.toString().split('') as EjercicioDigito[];
}