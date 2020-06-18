export interface Puntuacion {
  juego: string;
  puntajes: [{
    jugador: string;
    avatar: string;
    puntos: number;
  }?];
}