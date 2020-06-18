import { Router } from "express";
import * as servicio from "./sesiones.service";

export default class SesionesController {
  ruta = Router();

  constructor() {
    this.ruta
      .get("/:sesion", async (req, res) => res.json({ data: await servicio.buscarSesion(req.params.sesion) }))
      .delete("/:sesion", async (req, res) => res.json({ data: await servicio.destruirSesion(req.params.sesion) }))
      .post("/", async (req, res) => res.json({ data: await servicio.crearSesion(req.body.jugador, req.body.avatar) }));
  }

}