import { NgModule } from '@angular/core';

import {
  MdCardModule,
  MdToolbarModule,
  MdSidenavModule,
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdExpansionModule,
  MdRadioModule,
  MdListModule,
  MdSnackBarModule,
  MdTableModule,
  MdProgressSpinnerModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [],
  exports: [
    MdProgressSpinnerModule,
    MdToolbarModule,
    MdCardModule,
    MdSidenavModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdExpansionModule,
    MdRadioModule,
    MdListModule,
    MdSnackBarModule,
    MatProgressBarModule,
    MdTableModule,
    MatPaginatorModule,
    MatTooltipModule
  ]
})

export class MaterialModule { }
