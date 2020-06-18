import { SesionService } from "../Sesion/Sesion.service";

export async function subirPuntaje(juego: string, puntos: number, sesion?: string) {
  if (sesion === undefined || sesion === null) { return 0; }

  SesionService.agregarPuntaje(juego, puntos);

  const respuesta = await fetch("http://127.0.0.1:3001/api/v1.0/puntajes/", {
    body: JSON.stringify({ sesion, juego, puntos }),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  const posicionIndice = (await (respuesta.json() as Promise<{ data: { posicion: number } }>)).data.posicion;

  return posicionIndice === 3 ? 0 : posicionIndice + 1;
}