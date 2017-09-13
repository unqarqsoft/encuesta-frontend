import { Injectable } from '@angular/core'
import { Http } from '@angular/http';

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
