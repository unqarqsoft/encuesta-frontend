import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { CuatrimestreService } from '../../services/cuatrimestre.service';
import { EncuestaService } from '../../services/encuesta.service';
import { LoadingBarService } from '../../shared/loading-bar/loading-bar.service';
import { Cuatrimestre } from '../../models';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cuatrimestres: Cuatrimestre[];
  email: string;

  constructor(
    private cuatrimestreService: CuatrimestreService,
    private encuestaService: EncuestaService,
    private loadingBarService: LoadingBarService,
    public notification: MdSnackBar
  ) {}

  getCuatrimestres() {
    this.cuatrimestreService.getCuatrimestres().then(
      cuatrimestres => this.cuatrimestres = cuatrimestres
    );
  }

  onSubmit(form, cuatrimestre) {
    this.loadingBarService.show = true;
    this.encuestaService.generarEncuesta(cuatrimestre, form.value.email)
      .then(response => {
        console.log(response);
        this.notification.open("Encuesta enviada por email", "OK", {duration: 4000});
      }).catch(() => {
        this.notification.open("Ha ocurrido un error, intente más tarde", "ERROR",
          {duration: 4000, extraClasses: ['error']});
      }).then(() => {
        form.resetForm();
        this.loadingBarService.show = false;
      });
  }

  ngOnInit() {
    this.getCuatrimestres();
  }
}
