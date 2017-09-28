import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { MdPaginator } from '@angular/material';

import { EstadisticaService } from '../../services/estadistica.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  materias;
  data: MateriaDataSource;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private estadisticaService: EstadisticaService) { }

  ngOnInit() {
    this.estadisticaService.getComisiones()
      .then(materias => {
        this.data = new MateriaDataSource(materias, this.paginator);
        this.materias = this.data.connect();
      });

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.data) { return; }
          this.data.filter = this.filter.nativeElement.value;
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

}

export class MateriaDataSource extends DataSource<any> {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: any[] = [];
  renderedData: any[] = [];

  constructor(public materias: any[], private paginator: MdPaginator) {
    super();
    this.dataChange.next(materias);
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.dataChange,
      this._filterChange,
      this.paginator.page
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this.materias.slice().filter((item) => {
        let searchStr = (item.materia.nombre).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = this.filteredData.splice(startIndex, this.paginator.pageSize);

      return this.renderedData;
    });
  }

  disconnect() {}
}
