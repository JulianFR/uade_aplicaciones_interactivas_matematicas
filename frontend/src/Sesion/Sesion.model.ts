export class Sesion {
  constructor(
    public readonly _id: string,
    public readonly jugador: string,
    public readonly avatar: string,
    public readonly puntajes: Puntaje[] = []
  ) { }

  actualizarPuntuaciones(juego: string, puntos: number) {
    const puntajeAnterior = this.puntajes.find(p => p.juego === juego)

    if (puntajeAnterior) {
      if (puntajeAnterior.puntos < puntos) { puntajeAnterior.puntos = puntos; }
    } else {
      this.puntajes.push({ juego, puntos });
    }
  }

  obtenerPuntuacion(juego: string) {
    return this.puntajes.find(puntaje => puntaje.juego === juego)?.puntos || 0;
  }
}

export interface Puntaje {
  juego: string;
  puntos: number;
}