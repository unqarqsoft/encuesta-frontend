import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";

import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [
    LoadingComponent,
    NavbarComponent,
    HeaderComponent
  ],
  exports: [
    MaterialModule,
    LoadingComponent,
    HeaderComponent,
    NavbarComponent,
    FlexLayoutModule
  ]
})

export class SharedModule { }
