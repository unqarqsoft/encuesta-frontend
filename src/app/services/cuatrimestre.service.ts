import { Injectable } from '@angular/core'
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Cuatrimestre } from '../models';

@Injectable()
export class CuatrimestreService {
  url: string = environment.apiUrl + "cuatrimestres";

  constructor(private http: Http) { }

  getCuatrimestres() {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json() as Cuatrimestre[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
