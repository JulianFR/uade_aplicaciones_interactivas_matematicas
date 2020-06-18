export interface Sesion {
  _id: string;
  jugador: string;
  avatar: string;
  puntajes: [{
    juego: string;
    puntos: number;
  }];
}
