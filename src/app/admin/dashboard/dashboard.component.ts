import { Component, OnInit } from '@angular/core';

import { EstadisticaService } from '../../services/estadistica.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  materiasHorario;
  encuestasCuatrimestre;

  constructor(private estadisticaService: EstadisticaService) { }

  ngOnInit() {
    this.estadisticaService.getHorario()
      .then(response => this.materiasHorario = response);
    this.estadisticaService.getEncuestasCuatrimestre()
      .then(response => this.encuestasCuatrimestre = response);
  }

}
