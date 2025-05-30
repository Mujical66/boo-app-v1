import { Routes } from '@angular/router';
import { RegistrarEventoPage } from './pages/registrar-evento/registrar-evento.page';

export const routes: Routes = [
  {
    path: 'registrar-evento',
    component: RegistrarEventoPage,
  },
  {
    path: '',
    redirectTo: 'registrar-evento',
    pathMatch: 'full',
  },
];
