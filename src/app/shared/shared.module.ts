import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";

import { NavbarComponent } from './navbar/navbar.component';
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
  MdTableModule,
  MdProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    MdProgressSpinnerModule,
    CommonModule,
    FlexLayoutModule,
    MdToolbarModule,
    MdButtonModule,
    RouterModule
  ],
  declarations: [
    LoadingComponent,
    NavbarComponent
  ],
  exports: [
    MdCardModule,
    MdSidenavModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdExpansionModule,
    MdRadioModule,
    MdListModule,
    MdSnackBarModule,
    LoadingComponent,
    MdTableModule,
    NavbarComponent,
    FlexLayoutModule
  ]
})

export class SharedModule { }
