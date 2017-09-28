import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Encuesta, Comision, Respuesta } from '../../models';
import { EncuestaService } from '../../services/encuesta.service';
import { AlumnoService } from '../../services/alumno.service';

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
    private encuestaService: EncuestaService,
    private alumnoService: AlumnoService,
    public notification: MdSnackBar
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.encuestaService.getEncuesta(params.get('token')))
      .subscribe(encuesta => this.loadEncuesta(encuesta));
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

  loadEncuesta(encuesta: Encuesta) {
    this.alumnoService.setAlumno(encuesta.alumno);
    this.loadRespuestas(encuesta);
    this.oferta = encuesta.cuatrimestre.ofertas.reduce((list, oferta) => {
      let base = (typeof list[oferta.materia.nucleo] === 'undefined' ? [] : list[oferta.materia.nucleo]);
      base.push(oferta);
      list[oferta.materia.nucleo] = base;
      return list;
    }, {});
    this._encuesta = encuesta;
  }

  loadRespuestas(encuesta: Encuesta) {
    encuesta.cuatrimestre.ofertas.forEach((oferta) => {
      let rta = new Respuesta();
      rta.materia = oferta.materia;
      rta.respuesta = 'NO_CURSA';
      this.selecciones[oferta.materia.id] = rta;
    });
    encuesta.respuestas.forEach((respuesta) => {
      let rta = new Respuesta();
      rta.materia = respuesta.materia;
      rta.comision = respuesta.comision;
      rta.respuesta = respuesta.respuesta;
      this.selecciones[respuesta.materia.id] = rta;
    });
  }

  nucleos() {
    return Object.keys(this.oferta);
  }

  getPanelClass(materiaId: number) {
    if (materiaId in this.selecciones) {
      return {
        'panel-comision': this.selecciones[materiaId].respuesta == 'COMISION',
        'panel-nocursa': this.selecciones[materiaId].respuesta == 'NO_CURSA',
        'panel-nohorario': this.selecciones[materiaId].respuesta == 'NO_HORARIO'
      };
    }

    return {};
  }

  selectOption(event) {
    let respuesta = event.value;
    this.selecciones[respuesta.materia.id] = respuesta;
  }

  saveEncuesta(button) {
    button.disabled = true;
    this._encuesta.respuestas = Object.values(this.selecciones) as Respuesta[];
    this.encuestaService.putEncuestaRespuestas(this._encuesta).then(
      response => {
        this.notification.open("Encuesta guardada", "OK", {duration: 4000});
        button.disabled = false;
      }
    );
  }
}
