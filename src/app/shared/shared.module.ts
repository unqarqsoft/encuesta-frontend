import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";

import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { LoadingBarService } from './loading-bar/loading-bar.service';
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
    LoadingBarComponent,
    NavbarComponent,
    HeaderComponent
  ],
  providers: [
    LoadingBarService
  ],
  exports: [
    MaterialModule,
    LoadingComponent,
    LoadingBarComponent,
    HeaderComponent,
    NavbarComponent,
    FlexLayoutModule
  ]
})

export class SharedModule { }
