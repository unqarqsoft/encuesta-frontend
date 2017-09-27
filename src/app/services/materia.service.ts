import { Injectable } from '@angular/core'
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';
import { Materia } from '../models';

@Injectable()
export class MateriaService {
  url: string = environment.apiUrl + "materias";

  constructor(private http: Http) { }

  getMaterias() {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json() as Materia[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
