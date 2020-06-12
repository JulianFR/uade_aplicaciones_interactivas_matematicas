import { obtenerPuntajes, buscarSesion } from "../sesiones/sesiones.service";

const mejoresPuntajes: any = {
  "todos":
    [{
      "jugador": "Adriana",
      "avatar": "avi",
      "puntos": 1000,
    },
    {
      "jugador": "Roco",
      "avatar": "ovo",
      "puntos": 900,
    },
    {
      "jugador": "Emilio",
      "avatar": "ovo",
      "puntos": 800,
    },
    {
      "jugador": "Guille",
      "avatar": "avi",
      "puntos": 700,
    },
    {
      "jugador": "Rex",
      "avatar": "raptor",
      "puntos": 600,
    },
    {
      "jugador": "Dilo",
      "avatar": "ovo",
      "puntos": 500,
    },
    {
      "jugador": "Lystro",
      "avatar": "avi",
      "puntos": 400,
    },
    {
      "jugador": "Igu",
      "avatar": "avi",
      "puntos": 300,
    },
    {
      "jugador": "Anky",
      "avatar": "raptor",
      "puntos": 200,
    },
    {
      "jugador": "Argen",
      "avatar": "avi",
      "puntos": 100,
    }]
};

export function getPuntajes(juego?: string) {
  if (juego) {
    if (!mejoresPuntajes[juego]) { mejoresPuntajes[juego] = []; }

    return mejoresPuntajes[juego];
  }

  return mejoresPuntajes;
}

export function postPuntaje(sesion: number, juego: string, puntos: number) {
  const sesionBuscada = buscarSesion(sesion);
  const puntajes = obtenerPuntajes(sesion);
  const puntajeExistente = puntajes[puntajes.findIndex((p: any) => p.juego === juego)];

  if (!puntajeExistente) {
    puntajes.push({ juego, puntos });
  } else if (puntajeExistente.puntos < puntos) {
    puntajeExistente.puntos = puntos;
  }

  return {
    posicion: actualizarMejoresPuntajes(sesionBuscada.jugador, juego, sesionBuscada.avatar, puntos)
  };
}

export function cerrarPuntaje(sesion: number) {
  const sesionBuscada = buscarSesion(sesion);
  const puntajes = obtenerPuntajes(sesion);
  const puntos = puntajes.reduce((total: number, p: any) => total + p.puntos, 0);

  return {
    posicion: actualizarMejoresPuntajes(sesionBuscada.jugador, "todos", sesionBuscada.avatar, puntos),
    puntos
  };
}

function actualizarMejoresPuntajes(jugador: string, juego: string, avatar: string, puntos: number) {
  const puntajes: any[] = getPuntajes(juego);
  const posicion = puntajes.findIndex((puntaje: any) => puntaje.puntos < puntos);
  const posicionFinal = posicion === -1 ? puntajes.length : posicion;

  puntajes.splice(posicionFinal, 0, { jugador, avatar, puntos });

  if ((juego === "todos" && puntajes.length > 10) || (juego !== "todos" && puntajes.length > 3)) puntajes.pop();

  return posicionFinal;
}