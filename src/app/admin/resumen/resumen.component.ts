import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { DataSource } from '../../utils/datasource';
import { EstadisticaService } from '../../services/estadistica.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  materias;
  dataSource: DataSource<any>;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private estadisticaService: EstadisticaService) { }

  ngOnInit() {
    this.estadisticaService.getComisiones()
      .then(materias => {
        this.dataSource = new DataSource(materias, this.paginator);
        this.dataSource.itemValue = oferta => {return oferta.materia.nombre};
        this.materias = this.dataSource.connect();
      });

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
  }

  getStatusColor(comision) {
    if (comision.status == 'BAJA') {
      return 'warn';
    }
    if (comision.status == 'ALTA') {
      return 'warn';
    }
    return 'accent';
  }

  hasWarning(materia) {
    return materia.comisiones.reduce((bool, comision) => bool || (comision.status != 'OK'), false)
  }
}
