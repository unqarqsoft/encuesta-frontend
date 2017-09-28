import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { MateriaComponent } from './materia/materia.component';
import { AlumnoNewComponent } from './alumno/alumno-new.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'alumnos',
        component: AlumnoComponent,
      },
      {
        path: 'alumnos/new',
        component: AlumnoNewComponent
      },
      {
        path: 'materias',
        component: MateriaComponent,
      }
    ]
  }
];
