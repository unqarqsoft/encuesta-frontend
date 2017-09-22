import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent {
  alumno: Alumno;

  constructor(private alumnoService: AlumnoService) {
    alumnoService.alumno.subscribe(alumno => this.alumno = alumno);
  }

  gravatar() {
    return 'http://www.gravatar.com/avatar/'+Md5.hashStr(this.alumno.email)+'?s=32&d=mm';
  }
}
