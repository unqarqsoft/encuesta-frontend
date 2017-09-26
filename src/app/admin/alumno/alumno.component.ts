import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  columns = ['id', 'nombre', 'apellido', 'email'];
  dataSource: AlumnoDataSource;

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.alumnoService.getAlumnos()
      .then(alumnos => this.dataSource = new AlumnoDataSource(alumnos));
  }
}

export class AlumnoDataSource extends DataSource<Alumno> {
  constructor(private alumnos: Alumno[]) {
    super();
  }

  connect(): Observable<Alumno[]> {
    return Observable.of(this.alumnos);
  }

  disconnect() {}
}
