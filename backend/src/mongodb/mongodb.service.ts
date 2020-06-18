
import { MongoClient } from 'mongodb';
import { mongodb } from '../main.configuration.json';

export async function obtenerCliente() {
  const uri = mongodb.uri;
  const opciones = { useNewUrlParser: true, useUnifiedTopology: true };
  
  return await new MongoClient(uri, opciones).connect();
}

export function cerrarCliente(cliente?: MongoClient) {
  if (cliente) cliente.close();
}