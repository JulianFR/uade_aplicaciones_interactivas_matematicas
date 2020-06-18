import { Router } from "express";
import * as servicio from "./puntajes.service";

export class PuntajesController {
  ruta = Router();

  constructor() {
    this.ruta
      .get("/", async (req, res) => res.json({ data: await servicio.getPuntajes() }))
      .post("/", async (req, res) => res.json({ data: await servicio.postPuntaje(req.body.sesion, req.body.juego, req.body.puntos) }));
  }
}