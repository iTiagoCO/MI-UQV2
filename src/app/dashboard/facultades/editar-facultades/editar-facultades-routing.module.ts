import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarFacultadesPage } from './editar-facultades.page';

const routes: Routes = [
  {
    path: '',
    component: EditarFacultadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarFacultadesPageRoutingModule {}
