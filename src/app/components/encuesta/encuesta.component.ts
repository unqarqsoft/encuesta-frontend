import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Encuesta, Comision, Respuesta } from '../../models';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  _encuesta: Encuesta;
  encuesta: Observable<Encuesta>;
  selecciones = {};

  constructor(
    private route: ActivatedRoute,
    private encuestaService: EncuestaService
  ) {}

  ngOnInit() {
    this.encuesta = this.route.paramMap
      .switchMap((params: ParamMap) => this.encuestaService.getEncuesta(params.get('token')));
    this.encuesta.subscribe(encuesta => {
      this._encuesta = encuesta;
      console.log(encuesta)
    });
  }

  selectComision(event, materia) {
    this.selecciones[materia.id] = event.value.descripcion;
    let respuesta = new Respuesta();
    respuesta.comision = event.value;
    respuesta.respuesta = 'COMISION';
    respuesta.materia = materia;
    this._encuesta.respuestas.push(respuesta);
    console.log(this._encuesta.respuestas)
  }

  saveEncuesta() {
    this.encuestaService.putEncuestaRespuestas(this._encuesta);
  }
}
