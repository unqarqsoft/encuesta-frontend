import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';

import { routes } from './admin.routes';
import { AlumnoComponent } from './alumno/alumno.component';
import { MateriaComponent } from './materia/materia.component';
import { AlumnoNewComponent } from './alumno/alumno-new.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumenComponent } from './resumen/resumen.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdminComponent,
    AlumnoComponent,
    MateriaComponent,
    AlumnoNewComponent,
    DashboardComponent,
    ResumenComponent
  ]
})
export class AdminModule { }
