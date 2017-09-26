import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AlumnoComponent } from './alumno/alumno.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'alumnos',
        component: AlumnoComponent,
      }
    ]
  }
];
