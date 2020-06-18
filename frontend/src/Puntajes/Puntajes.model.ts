export interface PuntajesState {
  mostrarPuntajesPorJuego: boolean;
  estado: string;
  puntajes: [{
    _id: string;
    juego: string;
    puntajes: [{
      jugador: string;
      avatar: string;
      puntos: number;
    }?];
  }?];
}