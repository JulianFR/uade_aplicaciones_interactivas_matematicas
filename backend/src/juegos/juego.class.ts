import { lanzarError } from "../main.util";
import { JuegoDto } from "./juego.dto";
import { Niveles } from "./juegos.model";

export class Juego {
  private readonly nivel: Niveles;
  private readonly respuestas: number[] = [];

  constructor({ nivel, respuestas = [] }: JuegoDto) {
    if (nivel < 0 || nivel > 3) { lanzarError(400, "No es posíble crear el juego, nivel inválido: " + nivel); }

    this.nivel = nivel;
    this.respuestas = respuestas;
  }

  corregirRespuestas(respuestas: number[]) {
    if (!respuestas) { lanzarError(400, "No es posíble corregir el juego, respuestas nulas: " + respuestas); }
    if (!Array.isArray(respuestas)) { lanzarError(400, "No es posíble corregir el juego, respuestas no es un arreglo: " + respuestas); }
    if (respuestas.length !== this.respuestas.length) { lanzarError(400, "No es posíble corregir el juego, cantidad de respuestas distintas: " + respuestas.length); }

    return this.respuestas.map((respuesta, indice) => respuesta === respuestas[indice]);
  }
}