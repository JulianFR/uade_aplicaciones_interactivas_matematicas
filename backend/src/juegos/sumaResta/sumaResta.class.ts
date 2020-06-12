
import { SumaRestaEjercicioOperador, SumaRestaEjercicioIncognita, SumaRestaDto } from "./sumaResta.model";
import { Niveles } from "../juegos.model";
import { tomarUnoAlAzar } from "./sumaResta.helper";
import { lanzarError } from "../../main.util";

export class SumaResta {
  constructor(
    nivel: Niveles = 1,
    public readonly operador: SumaRestaEjercicioOperador = tomarUnoAlAzar(['+', '-']),
    public readonly incognita: SumaRestaEjercicioIncognita = tomarUnoAlAzar(['operandoA', 'operandoB', 'resultado']),
    public readonly resultado: number = Math.floor(Math.random() * Math.pow(10, nivel)),
    public readonly operandoA: number = -1,
    public readonly operandoB: number = -1,
  ) {
    if (nivel < 0 || nivel > 3) lanzarError(400, "No es posíble crear el juego, nivel inválido: " + nivel);
    if (operandoA === -1 || operandoB === -1) {
      if (operador === '+') {
        this.operandoA = Math.round(resultado * Math.random());
        this.operandoB = resultado - operandoA;
      } else {
        this.operandoA = resultado + Math.floor(((9.99 * Math.pow(10, nivel - 1)) - resultado) * Math.random());
        this.operandoB = -resultado + operandoA;
      }
    }
  }

  aDto(): SumaRestaDto {
    const ejercicio: SumaRestaDto = { ...this, incognita: undefined };

    ejercicio[this.incognita] = undefined;

    return ejercicio;
  }

  obtenerRespuesta(): number {
    return this[this.incognita];
  }
}