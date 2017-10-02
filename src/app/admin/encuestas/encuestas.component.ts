import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { DataSource } from '../../utils/datasource';
import { EncuestaService } from '../../services/encuesta.service';
import { Encuesta, Respuesta } from '../../models';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {
  encuestas: Observable<Encuesta[]>;
  dataSource: DataSource<Encuesta>;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private encuestaService: EncuestaService) { }

  ngOnInit() {
    this.encuestaService.getEncuestas()
      .then(encuestas => {
        this.dataSource = new DataSource<Encuesta>(encuestas, this.paginator);
        this.dataSource.itemValue = encuesta => {return encuesta.alumno.nombre + encuesta.alumno.apellido};
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
