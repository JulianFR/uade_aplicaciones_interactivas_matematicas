import { Router } from "express";
import { SumaResta } from "./sumaResta/sumaResta.class";
import { Niveles } from "./juegos.model";
import { agregarJuego, obtenerJuego } from "../sesiones/sesiones.service";
import { Juego } from "./juego.class";

export class JuegosController {
  ruta = Router();

  constructor() {
    this.ruta
      .post("/sumas-y-restas", (req, res) => {
        const nivel: Niveles = req.body.nivel;
        const ejercicios: SumaResta[] = []

        for (let ejercicio = 0; ejercicio < 5 - (nivel - 1); ejercicio++) { ejercicios.push(new SumaResta(nivel)); }

        agregarJuego(req.body.sesion, new Juego({ nivel, respuestas: ejercicios.map(ejercicio => ejercicio.obtenerRespuesta()) }));

        return res.json(ejercicios.map(ejercicio => ejercicio.aDto()));
      })
      .post("/sumas-y-restas/respuestas", (req, res) => res.json(obtenerJuego(req.body.sesion).corregirRespuestas(req.body.respuestas)));
  }
}