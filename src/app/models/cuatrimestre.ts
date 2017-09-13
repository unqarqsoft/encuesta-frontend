import { Carrera, Oferta } from '.';

export class Cuatrimestre {
  descripcion: string;
  anio: string;
  periodo: number;
  carrera: Carrera;
  ofertas: Oferta[];
}
