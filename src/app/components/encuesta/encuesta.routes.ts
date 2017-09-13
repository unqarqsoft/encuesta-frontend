import { Route } from '@angular/router';

import { EncuestaComponent } from './encuesta.component';

export const EncuestaRoutes: Route[] = [
  {
    path: 'encuesta/:token',
    component: EncuestaComponent
  }
]
