import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataSource } from '../../utils/datasource';
import { MdPaginator } from '@angular/material';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  columns = ['id', 'nombre', 'apellido', 'email'];
  dataSource: DataSource<Alumno>;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.alumnoService.getAlumnos()
      .then(alumnos => this.dataSource = new DataSource<Alumno>(alumnos, this.paginator));
  }
}
