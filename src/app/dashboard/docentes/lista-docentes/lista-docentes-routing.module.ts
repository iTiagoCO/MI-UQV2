import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDocentesPage } from './lista-docentes.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDocentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDocentesPageRoutingModule {}
