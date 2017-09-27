import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models';

@Component({
  selector: 'app-alumno-new',
  templateUrl: './alumno-new.component.html',
  styleUrls: []
})
export class AlumnoNewComponent implements OnInit {
  alumno = new Alumno();

  constructor(
    private alumnoService: AlumnoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.alumnoService.postAlumno(this.alumno)
      .then(response => this.router.navigate(['./alumnos']));
  }
}
