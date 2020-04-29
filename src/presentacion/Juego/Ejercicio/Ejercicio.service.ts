import { EjercicioOperador, EjercicioIncognita } from "./Ejercicio.model";

export function determinarIncognita(operador: EjercicioOperador): EjercicioIncognita {
  let posibilidades: EjercicioIncognita[] = ['operandoA', 'operandoB', 'resultado'];

  // if (operador !== '-') { posibilidades.push('operacion'); }

  return tomarUnoAlAzar(posibilidades);
}

/** @deprecated */
export function determinarResultado(operador: EjercicioOperador): [number, number?, number?] {
  if (['+', '-'].includes(operador)) { return [Math.floor(Math.random() * 1000)]; }

  let resultado: number, operadorA: number, operadorB: number;
  
  if (operador === '*') {
    operadorB = Math.floor(Math.random() * 10)
    operadorA = Math.floor(Math.random() * 100);
    resultado = operadorA * operadorB;
  } else {
    operadorB = Math.floor(Math.random() * 9) + 1
    resultado = Math.floor(Math.random() * 100);
    operadorA = resultado * operadorB;
  }

  return [resultado, operadorA, operadorB];
}
  
export function determinarOperador(): EjercicioOperador {
  return tomarUnoAlAzar(['+', '-']);
}

export function tomarUnoAlAzar(unArreglo: any[]): any {
  return unArreglo[Math.floor(Math.random() * unArreglo.length)];
}
  
export function determinarOperandos(resultado: number, operador: EjercicioOperador): [number, number] {
  let operandoA: number;
  let operandoB: number;
  if (operador === '+') {
    operandoA = Math.round(resultado * Math.random());
    operandoB = resultado - operandoA;
  } else {
    operandoA = resultado + Math.floor((999 - resultado) * Math.random());
    operandoB = -resultado + operandoA;
  }

  return [operandoA, operandoB];
}

export function leerNumero(tecla: string, numeroActual: string): string {
  if (tecla === "Backspace") {
    return (numeroActual.length === 0)?  numeroActual : numeroActual.slice(0, numeroActual.length - 1);
    /*} else if (this.incognita === "operacion" && /[+-]/.test(tecla)) {
      this.setState({
        respuesta: numeroActual + tecla
      });*/
  } else if (numeroActual.length < 3 && /[0123456789]/.test(tecla)) { return numeroActual + tecla; }
  return numeroActual;
}