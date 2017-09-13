import { Comision, Materia } from '.';

export class Oferta {
  id: string;
  materia: Materia;
  comisiones: Comision[];
}
