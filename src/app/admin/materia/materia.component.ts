import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataSource } from '../../utils/datasource';
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
  dataSource: DataSource<Materia>;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private materiaService: MateriaService) { }

  ngOnInit() {
    this.materiaService.getMaterias()
      .then(materias => this.dataSource = new DataSource<Materia>(materias, this.paginator));
  }
}
