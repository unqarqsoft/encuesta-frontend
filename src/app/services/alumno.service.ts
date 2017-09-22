import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject';

import { Alumno } from '../models';

@Injectable()
export class AlumnoService {
  alumno: Subject<Alumno> = new Subject<Alumno>();
  
  setAlumno(alumno: Alumno) {
    this.alumno.next(alumno);
  }
}
