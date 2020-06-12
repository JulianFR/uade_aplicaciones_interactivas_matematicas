import { NextFunction, Request, Response, } from "express";

export function cors(request: Request, response: Response, next: NextFunction) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, DELETE");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
};

export function atraparErrores(error: any, request: Request, response: Response, next: NextFunction) {
  response.status(error.codigo || 500).json({ error });
}