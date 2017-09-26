import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';

import { routes } from './admin.routes';
import { AlumnoComponent } from './alumno/alumno.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminComponent, AlumnoComponent]
})
export class AdminModule { }
