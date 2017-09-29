import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { EncuestaService } from '../../services/encuesta.service';
import { Encuesta, Respuesta } from '../../models';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {
  encuestas: Observable<Encuesta[]>;
  dataSource: EncuestaDataSource;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private encuestaService: EncuestaService) { }

  ngOnInit() {
    this.encuestaService.getEncuestas()
      .then(encuestas => {
        this.dataSource = new EncuestaDataSource(encuestas, this.paginator)
        this.encuestas = this.dataSource.connect();
      });

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  comisiones(respuestas: Respuesta[]) {
    return respuestas.filter(respuesta => respuesta.respuesta == 'COMISION');
  }

}

export class EncuestaDataSource extends DataSource<Encuesta> {
  dataChange: BehaviorSubject<Encuesta[]> = new BehaviorSubject<Encuesta[]>([]);
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: any[] = [];
  renderedData: any[] = [];

  constructor(public data: Encuesta[], private paginator: MdPaginator) {
    super();
    this.dataChange.next(data);
  }

  connect(): Observable<Encuesta[]> {
    const displayDataChanges = [
      this.dataChange,
      this._filterChange,
      this.paginator.page
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this.data.slice().filter((item) => {
        let searchStr = (item.alumno.nombre + item.alumno.apellido).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = this.filteredData.splice(startIndex, this.paginator.pageSize);

      return this.renderedData;
    });
  }

  disconnect() {}
}
