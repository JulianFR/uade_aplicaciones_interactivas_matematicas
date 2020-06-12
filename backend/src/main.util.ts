export function lanzarError(codigo: number, mensaje: string): never {
  throw ({ codigo, mensaje });
}