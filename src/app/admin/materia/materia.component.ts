import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { MdPaginator } from '@angular/material';
import { MateriaService } from '../../services/materia.service';
import { Materia } from '../../models';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  columns = ['id', 'nombre', 'nucleo'];
  data: MateriaDataSource;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private materiaService: MateriaService) { }

  ngOnInit() {
    this.materiaService.getMaterias()
      .then(materias => this.data = new MateriaDataSource(materias, this.paginator));
  }
}

export class MateriaDataSource extends DataSource<Materia> {
  dataChange: BehaviorSubject<Materia[]> = new BehaviorSubject<Materia[]>([]);

  constructor(public materias: Materia[], private paginator: MdPaginator) {
    super();
    this.dataChange.next(materias);
  }

  connect(): Observable<Materia[]> {
    const displayDataChanges = [this.dataChange, this.paginator.page];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.materias.slice();
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect() {}
}
