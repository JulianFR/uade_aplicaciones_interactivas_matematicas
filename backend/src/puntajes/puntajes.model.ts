export interface PuntuacionDto {
  juego: string;
  puntajes: [{
    jugador: string;
    avatar: string;
    puntos: number;
  }?];
}