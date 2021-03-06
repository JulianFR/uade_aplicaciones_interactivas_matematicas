import { SumaRestaEjercicio } from "./AsociacionEjercicio/AsociacionEjercicio.model";

export type JuegoNiveles = 1 | 2 | 3;
export type SumaRestaColores = 'rojo' | 'verde' | 'gris';

export interface SumaRestaState {
    nivel: JuegoNiveles;
    tiempo: number;
    intentos: number;
    puntaje: number;
    ejercicios: SumaRestaEjercicio[];
}