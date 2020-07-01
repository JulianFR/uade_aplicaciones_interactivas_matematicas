import { lanzarError } from "../main.util";
import { cerrarPuntaje } from "../puntajes/puntajes.service";
import { obtenerCliente, cerrarCliente } from "../mongodb/mongodb.service";
import { ObjectID } from "mongodb";
import { SesionDto } from "./sesiones.model";

export async function crearSesion(jugador: string, avatar: string) {
  const cliente = await obtenerCliente();
  const sesion = await cliente.db().collection("sesiones").insertOne({ jugador, avatar, puntajes: [] });

  cerrarCliente();

  return { sesion: sesion.insertedId };
}

export async function destruirSesion(sesion: string) {
  const cliente = await obtenerCliente();
  const puntaje = await cerrarPuntaje(sesion);
  
  await cliente.db().collection("sesiones").findOneAndDelete({ _id: new ObjectID(sesion) });

  cerrarCliente();

  return puntaje;
}

export async function buscarSesion(sesion: string) {
  if (sesion === undefined || sesion === null) { lanzarError(400, "No es posíble encontrar la sesión, sesion nulo: " + sesion); }

  const cliente = await obtenerCliente();
  const sesionBuscada: SesionDto = (await cliente.db().collection("sesiones").find({ _id: new ObjectID(sesion) }).toArray()).pop();

  cerrarCliente();

  if (!sesionBuscada) { lanzarError(404, "No se encuentra la sesión: " + sesion); }

  return sesionBuscada;
}