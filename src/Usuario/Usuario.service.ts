import { Usuario, Puntaje } from "./Usuario.model";

export class UsuarioService {
  private static usuario?: Usuario;

  public static limpiarUsuario() {
    UsuarioService.usuario = undefined;
  }

  public static crearUsuario(nombre: string, avatar: string) {
    UsuarioService.usuario = new Usuario(nombre, avatar);
  }

  public static agregarPuntaje(puntaje: Puntaje) {
    UsuarioService.usuario?.actualizarPuntuaciones(puntaje);
  }

  public static obtenerNombre() {
    return UsuarioService.usuario?.nombre;
  }

  public static obtenerAvatar() {
    return UsuarioService.usuario?.avatar;
  }
}