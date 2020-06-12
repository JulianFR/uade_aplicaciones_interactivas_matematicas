import * as SumaRestaEjercicioHelper from './SumaRestaEjercicio.helper';
import { JuegoNiveles } from '../SumaResta.model';

export type SumaRestaEjercicioIncognita = "operandoA" | "operandoB" | "resultado";
export type SumaRestaEjercicioOperador = "+" | "-";
export type SumaRestaEjercicioEstado = "nuevo" | "correcto" | "incorrecto";

export interface EjercicioResultado {
  respuesta: string;
  entrada: string;
}

export interface EjercicioProps {
  id: number;
  ejercicio: SumaRestaEjercicio;
  cambio: (key: number, ejercicio: SumaRestaEjercicio) => void;
}

export class SumaRestaEjercicio {
  constructor(
    dificultad: JuegoNiveles = 1,
    public readonly operador: SumaRestaEjercicioOperador = SumaRestaEjercicioHelper.determinarOperador(),
    public readonly incognita: SumaRestaEjercicioIncognita = SumaRestaEjercicioHelper.determinarIncognita(),
    public readonly resultado: number = SumaRestaEjercicioHelper.determinarResultado(dificultad),
    public readonly operandoA: number = -1,
    public readonly operandoB: number = -1,
    public readonly entrada: string = "",
    public readonly estado: SumaRestaEjercicioEstado = "nuevo"
  ) {
    if (this.operandoA === -1) { [this.operandoA, this.operandoB] = SumaRestaEjercicioHelper.determinarOperandos(this.resultado, this.operador, dificultad); }
  }

  corregir(): SumaRestaEjercicio {
    if (this.estado === "correcto") return this;

    const entrada = (this.entrada === "") ? null : +this.entrada;

    return this.clonar((entrada === this[this.incognita]) ? "correcto" : "incorrecto");
  }

  cambiarEntrada(entrada: string): SumaRestaEjercicio {
    if (this.estado === "correcto") return this;

    return this.clonar(undefined, entrada);
  }

  private clonar(estado = this.estado, entrada = this.entrada) {
    return new SumaRestaEjercicio(undefined, this.operador, this.incognita, this.resultado, this.operandoA, this.operandoB, entrada, estado);
  }
}