import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaFacultadesPage } from './lista-facultades.page';

const routes: Routes = [
  {
    path: '',
    component: ListaFacultadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaFacultadesPageRoutingModule {}
