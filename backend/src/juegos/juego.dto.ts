import { Niveles } from "./juegos.model";

export interface JuegoDto {
  nivel: Niveles;
  respuestas: number[];
}