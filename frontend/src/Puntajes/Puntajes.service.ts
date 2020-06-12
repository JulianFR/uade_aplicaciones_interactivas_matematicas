export class PuntajesService {
  async obtenerPuntajes() {
    const respuesta = await fetch("http://127.0.0.1:3001/api/v1.0/puntajes");
    
    return (await respuesta.json()).data;
  }
}