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
  selecciones = {};
  oferta = {};

  constructor(
    private route: ActivatedRoute,
    private encuestaService: EncuestaService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.encuestaService.getEncuesta(params.get('token')))
      .subscribe(encuesta => this.setEncuesta(encuesta));
  }

  getValue(materia, respuesta, comision) {
    let rta = new Respuesta();
    rta.materia = materia;
    rta.respuesta = respuesta;
    rta.comision = comision;

    return rta;
  }

  comisionesSeleccionadas() {
    return Object.keys(this.selecciones).reduce((coms, key) => {
      let resp = this.selecciones[key];
      if ('COMISION' == resp.respuesta) {
        coms.push(resp);
      }
      return coms;
    }, []);
  }

  setEncuesta(encuesta: Encuesta) {
    this.selecciones = encuesta.respuestas.reduce((object, respuesta) => {
      let rta = new Respuesta();
      rta.materia = respuesta.materia;
      rta.comision = respuesta.comision;
      rta.respuesta = respuesta.respuesta;
      object[respuesta.materia.id] = rta;
      return object;
    }, {});
    this.oferta = encuesta.cuatrimestre.ofertas.reduce((list, oferta) => {
      let base = (typeof list[oferta.materia.nucleo] === 'undefined' ? [] : list[oferta.materia.nucleo]);
      base.push(oferta);
      list[oferta.materia.nucleo] = base;
      return list;
    }, {});
    this._encuesta = encuesta;
  }

  nucleos() {
    return Object.keys(this.oferta);
  }

  selectComision(event, materia) {
    let respuesta = event.value;
    this.selecciones[respuesta.materia.id] = respuesta;
    console.log(this.selecciones);
  }

  saveEncuesta() {
    let respuestas = Object.keys(this.selecciones).reduce((array, key) => {
      let rta = new Respuesta();
      let respuesta = this.selecciones[key];
      rta.materia = respuesta.materia;
      rta.comision = respuesta.comision;
      rta.respuesta = respuesta.respuesta;
      array.push(rta);
      return array;
    }, []);
    this._encuesta.respuestas = respuestas;
    this.encuestaService.putEncuestaRespuestas(this._encuesta);
  }
}
