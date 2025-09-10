import {Routes} from '@angular/router';
import {CreateComponent} from './pages/create/create.component';

export default [
  {
    path: '',
    loadComponent:() => import('./home').then((m) => m.Home),
  },
  {
    path: 'create',
    component:CreateComponent,
  },

] as Routes;
