export type SumaRestaEjercicioIncognita = "operandoA" | "operandoB" | "resultado";
export type SumaRestaEjercicioOperador = "+" | "-";

export interface SumaRestaDto {
  operador: SumaRestaEjercicioOperador;
  resultado?: number;
  operandoA?: number;
  operandoB?: number;
}