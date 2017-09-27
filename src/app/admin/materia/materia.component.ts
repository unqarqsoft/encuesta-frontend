import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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

  constructor(private materiaService: MateriaService) { }

  ngOnInit() {
    this.materiaService.getMaterias()
      .then(materias => this.data = new MateriaDataSource(materias));
  }

}

export class MateriaDataSource extends DataSource<Materia> {
  constructor(private materias: Materia[]) {
    super();
  }

  connect(): Observable<Materia[]> {
    return Observable.of(this.materias);
  }

  disconnect() {}
}
