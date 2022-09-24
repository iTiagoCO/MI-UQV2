import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearFacultadesPage } from './crear-facultades.page';

const routes: Routes = [
  {
    path: '',
    component: CrearFacultadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearFacultadesPageRoutingModule {}
