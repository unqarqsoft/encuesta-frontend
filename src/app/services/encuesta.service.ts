import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Encuesta } from '../models';

@Injectable()
export class EncuestaService {
  url: string = environment.apiUrl + "encuestas";

  constructor(private http: Http) { }

  getEncuesta(token: string) {
    return this.http.get(this.url + "/token/" + token)
      .toPromise()
      .then(response => response.json() as Encuesta)
      .catch(this.handleError);
  }

  getEncuestas() {
    return this.http.get(this.url).toPromise()
      .then(response => response.json() as Encuesta[])
      .catch(this.handleError);
  }

  putEncuestaRespuestas(encuesta) {
    return this.http.put(this.url + "/" + encuesta.id + "/respuestas", {respuestas: encuesta.respuestas})
      .toPromise()
      .then(response => {
        console.log(response);
        response.json() as Encuesta
      })
      .catch(this.handleError);
  }

  generarEncuesta(cuatrimestre, email) {
    return this.http.post(this.url + "/generar", {
      email: email,
      cuatrimestre: cuatrimestre
    }).toPromise()
      .then(response => response.json() as Encuesta)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
