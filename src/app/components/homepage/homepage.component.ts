import { Component, OnInit } from '@angular/core';

import { CuatrimestreService } from '../../services/cuatrimestre.service';
import { Cuatrimestre } from '../../models';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cuatrimestres: Cuatrimestre[];

  constructor(private cuatrimestreService: CuatrimestreService) { }

  getCuatrimestres() {
    this.cuatrimestreService.getCuatrimestres().then(
      cuatrimestres => this.cuatrimestres = cuatrimestres
    );
  }

  ngOnInit() {
    this.getCuatrimestres();
  }
}
