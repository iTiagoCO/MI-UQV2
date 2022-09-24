import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearDocentesPage } from './crear-docentes.page';

const routes: Routes = [
  {
    path: '',
    component: CrearDocentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearDocentesPageRoutingModule {}
