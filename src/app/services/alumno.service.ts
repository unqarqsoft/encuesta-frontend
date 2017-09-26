import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';
import { Alumno } from '../models';

@Injectable()
export class AlumnoService {
  url: string = environment.apiUrl + "alumnos";

  alumno: Subject<Alumno> = new Subject<Alumno>();

  constructor(private http: Http) { }

  setAlumno(alumno: Alumno) {
    this.alumno.next(alumno);
  }

  getAlumnos() {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json() as Alumno[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
