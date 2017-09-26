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

import { CuatrimestreService } from './services/cuatrimestre.service';
import { EncuestaService } from './services/encuesta.service';
import { AlumnoService } from './services/alumno.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    EncuestaComponent,
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
    AlumnoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
