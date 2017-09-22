import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { LoadingComponent } from './loading/loading.component';

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
  MdProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [MdProgressSpinnerModule, CommonModule, FlexLayoutModule],
  declarations: [LoadingComponent],
  exports: [
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
    LoadingComponent
  ]
})

export class SharedModule { }
