import { Routes } from '@angular/router';

import { EncuestaRoutes } from './components/encuesta/encuesta.routes';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  ...EncuestaRoutes
];
