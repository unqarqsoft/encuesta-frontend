import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Encuesta, Comision, Respuesta } from '../../models';
import { EncuestaService } from '../../services/encuesta.service';
import { AlumnoService } from '../../services/alumno.service';
import { LoadingBarService } from '../../shared/loading-bar/loading-bar.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit, OnDestroy {
  _encuesta: Encuesta;
  selecciones = {};
  oferta = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encuestaService: EncuestaService,
    private alumnoService: AlumnoService,
    private loadingBarService: LoadingBarService,
    public notification: MdSnackBar
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.encuestaService.getEncuesta(params.get('token')))
      .subscribe(encuesta => {
        if (!encuesta) {
          this.router.navigate(['/404']);
        } else {
          this.loadEncuesta(encuesta);
        }
      });
  }

  ngOnDestroy() {
    this.alumnoService.setAlumno(null);
  }

  getValue(materia, respuesta, comision) {
    return new Respuesta(respuesta, materia, comision);
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
      this.selecciones[oferta.materia.id] = new Respuesta('NO_CURSA', oferta.materia);
    });
    encuesta.respuestas.forEach((respuesta) => {
      let rta = new Respuesta(respuesta.respuesta, respuesta.materia, respuesta.comision);
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
    this.loadingBarService.show = true;
    this._encuesta.respuestas = Object.values(this.selecciones) as Respuesta[];
    console.log(this._encuesta);
    this.encuestaService.putEncuestaRespuestas(this._encuesta)
      .then(() =>
        this.notification.open("Encuesta guardada", "OK", {duration: 4000}))
      .catch(() =>
        this.notification.open("Ha ocurrido un error, intente más tarde", "ERROR",
          {duration: 4000, extraClasses: ['error']}))
      .then(() => {
        this.loadingBarService.show = false;
        button.disabled = false;
      });
  }
}
