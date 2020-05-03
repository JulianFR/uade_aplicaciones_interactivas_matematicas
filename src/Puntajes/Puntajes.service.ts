import puntuacionesMock from './Puntajes.mock.json';

export class PuntajesService {
  obtenerPuntajes() {
    return puntuacionesMock;
  }

  obtenerMejores(puntaje: any[]) {
    return puntaje.map(puntuacion => ({
      jugador: puntuacion.jugador,
      avatar: puntuacion.avatar,
      puntos: puntuacion.puntajes.reduce((total: number, p: any) => total + p.puntos, 0)
    }));
  }
}