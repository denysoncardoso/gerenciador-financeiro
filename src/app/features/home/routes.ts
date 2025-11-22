import {Routes} from '@angular/router';
import {CreateOrEditComponent} from './pages/create-or-edit/create-or-edit.component';
import {getTransactionByIdResolver} from './pages/create-or-edit/resolvers/get-transaction-by-id-resolver';


export default [
  {
    path: '',
    loadComponent:() => import('./home').then((m) => m.Home),
  },
  {
    path: 'create',
    component:CreateOrEditComponent,
  },
  {
    path: 'edit/:id',
    component:CreateOrEditComponent,
    resolve:{
      transaction: getTransactionByIdResolver
    }
  },

] as Routes;
