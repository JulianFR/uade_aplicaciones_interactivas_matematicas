import { Router } from "express";
import * as servicio from "./sesiones.service";

export default class SesionesController {
  ruta = Router();

  constructor() {
    this.ruta
      .get("/:sesion", (req, res) => res.json({ data: servicio.buscarSesion(+req.params.sesion) }))
      .delete("/:sesion", (req, res) => res.json({ data: servicio.destruirSesion(+req.params.sesion) }))
      .post("/", (req, res) => res.json({ data: servicio.crearSesion(req.body.jugador, req.body.avatar) }));
  }

}