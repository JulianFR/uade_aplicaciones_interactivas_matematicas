import { SumaRestaState, JuegoNiveles } from "./SumaResta.model";
import { SumaRestaEjercicio } from "./SumaRestaEjercicio/SumaRestaEjercicio.model";

export class SumaRestaService {
  iniciarNivel(nivel: JuegoNiveles, puntaje?: number): SumaRestaState {
    const ejercicios = [];

    for (let cantidad = 6 - nivel; cantidad > 0; cantidad--) { ejercicios.push(new SumaRestaEjercicio(nivel as JuegoNiveles)); }

    return {
      nivel,
      ejercicios,
      puntaje: puntaje || 0,
      tiempo: 120,
      intentos: 3,
      ocupado: false,
      seTermino: false,
      posicion: 0
    }
  }
}