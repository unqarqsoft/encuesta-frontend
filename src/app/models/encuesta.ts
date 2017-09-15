import { Alumno, Cuatrimestre, Respuesta } from '.';

export class Encuesta {
  id: string;
  token: string;
  alumno: Alumno;
  cuatrimestre: Cuatrimestre;
  respuestas: Respuesta[];
}
