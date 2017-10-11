import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollSpyModule } from 'ngx-scrollspy';
import { ScrollSpyAffixDirective } from 'ngx-scrollspy/dist/plugin/affix'

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';

import { HomepageComponent } from './components/homepage/homepage.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { Page404Component } from './components/page-404/page-404.component';

import { CuatrimestreService, EncuestaService, AlumnoService, MateriaService, EstadisticaService, UserService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    EncuestaComponent,
    Page404Component,
    ScrollSpyAffixDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ScrollSpyModule.forRoot(),
    RouterModule.forRoot(routes),
    SharedModule,
    AdminModule
  ],
  providers: [
    CuatrimestreService,
    EncuestaService,
    AlumnoService,
    MateriaService,
    EstadisticaService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
