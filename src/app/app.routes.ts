import { Routes } from '@angular/router';

import { EncuestaRoutes } from './components/encuesta/encuesta.routes';
import { HomepageComponent } from './components/homepage/homepage.component';
import { Page404Component } from './components/page-404/page-404.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  ...EncuestaRoutes,
  {
    path: '404',
    component: Page404Component
  },
  { path: '**', redirectTo: '/404' }
];
