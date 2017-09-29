import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

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
  dataSource: AlumnoDataSource;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.alumnoService.getAlumnos()
      .then(alumnos => this.dataSource = new AlumnoDataSource(alumnos, this.paginator));
  }
}

export class AlumnoDataSource extends DataSource<Alumno> {
  dataChange: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>([]);

  constructor(public alumnos: Alumno[], private paginator: MdPaginator) {
    super();
    this.dataChange.next(alumnos);
  }

  connect(): Observable<Alumno[]> {
    const displayDataChanges = [this.dataChange, this.paginator.page];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.alumnos.slice();
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect() {}
}
