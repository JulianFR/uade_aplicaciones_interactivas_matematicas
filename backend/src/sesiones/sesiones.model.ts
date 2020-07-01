export interface SesionDto {
  _id: string;
  jugador: string;
  avatar: string;
  puntajes: [{
    juego: string;
    puntos: number;
  }];
}
