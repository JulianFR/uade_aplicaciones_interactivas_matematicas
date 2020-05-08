export class Usuario {
  constructor(
    public readonly nombre: string,
    public readonly avatar: string,
    public readonly puntuaciones: PuntajeHistorica[] = []
  ) { }

  actualizarPuntuaciones(puntaje: Puntaje) {
    const puntajeAnterior = this.puntuaciones.find(p => p.juego === puntaje.juego)

    if (puntajeAnterior) {
      if (puntajeAnterior.mejor < puntaje.puntos) { puntajeAnterior.mejor = puntaje.puntos; }
      puntajeAnterior.ultima = puntaje.puntos;
    } else {
      this.puntuaciones.push({
        juego: puntaje.juego,
        mejor: puntaje.puntos,
        ultima: puntaje.puntos
      });
    }
  }
}

export interface PuntajeHistorica {
  juego: string;
  mejor: number;
  ultima: number;
}

export interface Puntaje {
  juego: string;
  puntos: number;
}