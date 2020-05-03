import { SumaRestaEjercicioOperador, SumaRestaEjercicioIncognita } from "./SumaRestaEjercicio.model";
import { JuegoNiveles } from "../SumaResta.model";

function tomarUnoAlAzar(unArreglo: any[]): any {
  return unArreglo[Math.floor(Math.random() * unArreglo.length)];
}

export function determinarOperador(): SumaRestaEjercicioOperador {
  return tomarUnoAlAzar(['+', '-']);
}

export function determinarIncognita(): SumaRestaEjercicioIncognita {
  let posibilidades: SumaRestaEjercicioIncognita[] = ['operandoA', 'operandoB', 'resultado'];

  return tomarUnoAlAzar(posibilidades);
}

export function determinarOperandos(resultado: number, operador: SumaRestaEjercicioOperador, dificultad: JuegoNiveles): [number, number] {
  let operandoA: number;
  let operandoB: number;
  if (operador === '+') {
    operandoA = Math.round(resultado * Math.random());
    operandoB = resultado - operandoA;
  } else {
    operandoA = resultado + Math.floor(((9.99 * Math.pow(10, dificultad - 1)) - resultado) * Math.random());
    operandoB = -resultado + operandoA;
  }

  return [operandoA, operandoB];
}

export function determinarResultado(dificultad: JuegoNiveles) {
  return Math.floor(Math.random() * Math.pow(10, dificultad))
}