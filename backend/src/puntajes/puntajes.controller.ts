import { Router } from "express";
import * as servicio from "./puntajes.service";

export class PuntajesController {
  ruta = Router();

  constructor() {
    this.ruta
      .get("/", (req, res) => res.json({ data: servicio.getPuntajes() }))
      .post("/", (req, res) => res.json({ data: servicio.postPuntaje(req.body.sesion, req.body.juego, req.body.puntos) }));
  }
}