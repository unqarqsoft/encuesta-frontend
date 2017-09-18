import { Comision, Materia } from '.';

export class Respuesta {
  id: string;
  respuesta: string;
  comision: Comision;
  materia: Materia;

  public descripcion(): string {
    if (this.comision instanceof Object) {
      return this.comision.descripcion;
    }
    if ('NO_CURSA' == this.respuesta) {
      return 'No voy a cursar';
    }
    return 'Tengo problema de horario';
  }
}
