import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAsignaturasPage } from './lista-asignaturas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAsignaturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAsignaturasPageRoutingModule {}
