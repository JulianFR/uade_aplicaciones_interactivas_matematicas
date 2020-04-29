export type EjercicioIncognita = "operandoA" /*| "operacion"*/ | "operandoB" | "resultado";
export type EjercicioOperador = "+" | "-" | "*" | "/";

export interface EjercicioResultado {
  respuesta: string;
  entrada: string;
}