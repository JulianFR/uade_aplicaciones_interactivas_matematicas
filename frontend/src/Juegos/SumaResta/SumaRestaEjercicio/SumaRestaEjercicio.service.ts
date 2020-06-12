export function leerNumero(tecla: string, numeroActual: string): string {
  if (tecla === "Backspace") {
    return (numeroActual.length === 0)?  numeroActual : numeroActual.slice(0, numeroActual.length - 1);
  } else if (numeroActual.length < 3 && /[0123456789]/.test(tecla)) { 
    return numeroActual + tecla; 
  }
  return numeroActual;
}