import { Usuario, Puntaje } from "./Usuario.model";

export class UsuarioService {
  private static usuario?: Usuario;

  public static limpiarUsuario() {
    UsuarioService.usuario = undefined;
  }

  public static crearUsuario(nombre: string) {
    UsuarioService.usuario = new Usuario(nombre);
  }

  public static agregarPuntaje(puntaje: Puntaje) {
    UsuarioService.usuario?.actualizarPuntuaciones(puntaje);
  }
}