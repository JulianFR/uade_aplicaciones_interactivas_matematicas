import { Juego } from "../juegos/juego.class";
import { lanzarError } from "../main.util";
import { cerrarPuntaje } from "../puntajes/puntajes.service";

const sesiones: any[] = [];

export function crearSesion(jugador: string, avatar: string) {
  sesiones.push({ sesion: sesiones.length, jugador, avatar, puntajes: [] });

  return {sesion: sesiones.length - 1}
}

export function destruirSesion(sesion: number) {
  return cerrarPuntaje(sesion);
}

export function buscarSesion(sesion: number) {
  if (sesion === undefined || sesion === null) { lanzarError(400, "No es posíble encontrar la sesión, sesion nulo: " + sesion); }

  const sesionBuscada = sesiones[sesion];

  if (!sesionBuscada) { lanzarError(404, "No se encuentra la sesión: " + sesion); }

  return sesionBuscada;
}

export function obtenerJuego(sesion: number) {
  const juego = buscarSesion(sesion).juego;

  if (!juego) { lanzarError(404, "La sesión no cuenta con un juego: " + sesion); }

  return new Juego({ ...juego });
}

export function obtenerPuntajes(sesion: number) {
  return buscarSesion(sesion).puntajes;
}