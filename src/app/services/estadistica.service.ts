import { Injectable } from '@angular/core'
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class EstadisticaService {
  url: string = environment.apiUrl + "estadisticas";

  constructor(private http: Http) { }

  getComisiones() {
    return this.http.get(this.url + "/comisiones")
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getHorario() {
    return this.http.get(this.url + "/horario")
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getEncuestasCuatrimestre() {
    return this.http.get(this.url + "/encuestas")
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
