import { Router } from "express";
import * as servicio from "./puntajes.service";
import jwt from "jsonwebtoken";
import * as config from "../main.configuration.json";

export class PuntajesController {
  ruta = Router();

  constructor() {
    this.ruta
      .get("/", async (req, res) => res.json({ data: await servicio.getPuntajes() }))
      .post("/", async (req, res) => {
        const { sesion, juego, puntos } = jwt.verify(req.body.data, config.jwt.secret) as any;

        res.json({ data: await servicio.postPuntaje(sesion, juego, puntos) })
      });
  }
}