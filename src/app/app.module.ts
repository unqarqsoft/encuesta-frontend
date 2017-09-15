import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { HomepageComponent } from './components/homepage/homepage.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { EncuestaMateriaComponent } from './components/encuesta/encuesta-materia.component';

import { CuatrimestreService } from './services/cuatrimestre.service';
import { EncuestaService } from './services/encuesta.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    EncuestaComponent,
    EncuestaMateriaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [
    CuatrimestreService,
    EncuestaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
