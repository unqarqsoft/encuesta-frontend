import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";

import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './header/header.component';

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
  MatProgressBarModule
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
    NavbarComponent,
    HeaderComponent
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
    MatProgressBarModule,
    LoadingComponent,
    HeaderComponent,
    MdTableModule,
    NavbarComponent,
    FlexLayoutModule,
    MatPaginatorModule
  ]
})

export class SharedModule { }
