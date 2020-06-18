import { Sesion } from "./Sesion.model";

export class SesionService {
  private static sesion?: Sesion;

  public static async descargarSesion() {
    try {
      if (this.sesion) return this.sesion;

      const sesionId = localStorage.getItem("sesion");

      if (sesionId === undefined || sesionId === null) return;

      const respuesta = await fetch("http://127.0.0.1:3001/api/v1.0/sesiones/" + sesionId);
      const sesionDto = (await respuesta.json()).data;

      this.sesion = new Sesion(sesionDto._id, sesionDto.jugador, sesionDto.avatar, sesionDto.puntajes);

      return this.sesion;
    } catch (error) {
      localStorage.removeItem("sesion");
      return false;
    }
  }

  public static async destruirSesion() {
    const sesionId = localStorage.getItem("sesion");
    const respuesta = await fetch("http://127.0.0.1:3001/api/v1.0/sesiones/" + sesionId, { method: "DELETE" });
    const datos = (await respuesta.json()).data;

    SesionService.sesion = undefined;

    localStorage.removeItem("sesion");

    return {
      posicion: datos.posicion + 1,
      puntos: datos.puntos
    }
  }

  public static async crearSesion(jugador: string, avatar: string) {
    const body = JSON.stringify({ jugador, avatar });
    const headers = { "Content-Type": "application/json" };
    const respuesta = await fetch("http://127.0.0.1:3001/api/v1.0/sesiones", { method: "POST", body, headers });
    const sesion: string = (await respuesta.json()).data.sesion;

    SesionService.sesion = new Sesion(sesion, jugador, avatar, []);
    localStorage.setItem("sesion", sesion.toString());
  }

  public static agregarPuntaje(juego: string, puntos: number) {
    SesionService.sesion?.actualizarPuntuaciones(juego, puntos);
  }

  public static obtenerPuntaje(juego: string) {
    return SesionService.sesion?.obtenerPuntuacion(juego);
  }

  public static obtenerSesionId() {
    return SesionService.sesion?._id;
  }

  public static obtenerJugador() {
    return SesionService.sesion?.jugador;
  }

  public static obtenerAvatar() {
    return SesionService.sesion?.avatar;
  }
}