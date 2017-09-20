import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { CuatrimestreService } from '../../services/cuatrimestre.service';
import { EncuestaService } from '../../services/encuesta.service';
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
    public notification: MdSnackBar
  ) {}

  getCuatrimestres() {
    this.cuatrimestreService.getCuatrimestres().then(
      cuatrimestres => this.cuatrimestres = cuatrimestres
    );
  }

  onSubmit(form, cuatrimestre) {
    this.encuestaService.generarEncuesta(cuatrimestre, form.value.email).then(
      response => {
        console.log(response)
        this.notification.open("Encuesta enviada por email", "OK", {duration: 4000});
      }
    );
  }

  ngOnInit() {
    this.getCuatrimestres();
  }
}
