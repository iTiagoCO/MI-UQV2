import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAlumnosGruposPage } from './lista-alumnos-grupos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAlumnosGruposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAlumnosGruposPageRoutingModule {}
