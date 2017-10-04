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
  MatTooltipModule,
  MatSortModule
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
    MatTooltipModule,
    MatSortModule
  ]
})

export class MaterialModule { }
