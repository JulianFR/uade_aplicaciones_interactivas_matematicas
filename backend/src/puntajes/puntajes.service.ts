import { buscarSesion } from "../sesiones/sesiones.service";
import { obtenerCliente, cerrarCliente } from "../mongodb/mongodb.service";

export async function getPuntajes() {
  const cliente = await obtenerCliente();
  const puntajes = await cliente.db().collection("puntajes").find({}).toArray();

  cerrarCliente();

  return puntajes;
}

export async function postPuntaje(sesion: string, juego: string, puntos: number) {
  const sesionBuscada = await buscarSesion(sesion);
  const puntajes = sesionBuscada.puntajes;
  const puntajeExistente = puntajes[puntajes.findIndex((p: any) => p.juego === juego)];

  if (!puntajeExistente) {
    puntajes.push({ juego, puntos });
  } else if (puntajeExistente.puntos < puntos) {
    puntajeExistente.puntos = puntos;
  }

  const cliente = await obtenerCliente();
  await cliente.db().collection("sesiones").findOneAndReplace({ _id: sesionBuscada._id }, sesionBuscada);

  cerrarCliente();

  return {
    posicion: await actualizarMejoresPuntajes(sesionBuscada.jugador, juego, sesionBuscada.avatar, puntos)
  };
}

export async function cerrarPuntaje(sesion: string) {
  const sesionBuscada = await buscarSesion(sesion);
  const puntajes = sesionBuscada.puntajes;
  const puntos = puntajes.reduce((total: number, p: any) => total + p.puntos, 0);

  return {
    posicion: await actualizarMejoresPuntajes(sesionBuscada.jugador, "todos", sesionBuscada.avatar, puntos),
    puntos
  };
}

async function actualizarMejoresPuntajes(jugador: string, juego: string, avatar: string, puntos: number) {
  const cliente = await obtenerCliente();
  const puntuaciones = (await cliente.db().collection("puntajes").find({ juego }).toArray()).pop();
  const puntajes = puntuaciones.puntajes;
  const posicion = puntajes.findIndex((puntaje: any) => puntaje.puntos < puntos);
  const posicionFinal = posicion === -1 ? puntajes.length : posicion;
  
  puntajes.splice(posicionFinal, 0, { jugador, avatar, puntos });
  
  if ((juego === "todos" && puntajes.length > 10) || (juego !== "todos" && puntajes.length > 3)) puntajes.pop();
  
  await cliente.db().collection("puntajes").findOneAndReplace({ _id: puntuaciones._id }, puntuaciones);
  
  cerrarCliente();

  return posicionFinal;
}