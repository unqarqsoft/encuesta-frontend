import { Comision, Materia } from '.';

export class Respuesta {
  id: string;
  respuesta: string;
  comision: Comision;
  materia: Materia;

  constructor(respuesta: string, materia: Materia, comision?: Comision) {
    this.respuesta = respuesta;
    this.materia = materia;
    this.comision = comision;
  }

  public descripcion(): string {
    if (this.comision instanceof Object) {
      return this.comision.descripcion;
    }
    if ('NO_CURSA' == this.respuesta) {
      return 'No voy a cursar';
    }
    if ('APROBADA' == this.respuesta) {
      return 'Ya aprobé';
    }
    return 'Tengo problema de horario';
  }
}
