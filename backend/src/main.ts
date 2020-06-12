import express from "express";
import morgan from "morgan";
import { PuntajesController } from "./puntajes/puntajes.controller";
import { cors, atraparErrores } from "./main.middleware";
import SesionesController from "./sesiones/sesiones.controller";

express()
  .use(morgan("dev"))
  .use(express.json())
  .use(cors)
  .use("/api/v1.0/puntajes", new PuntajesController().ruta)
  .use("/api/v1.0/sesiones", new SesionesController().ruta)
  .use(atraparErrores)
  .listen(3001, () => console.log("HOLIS"));