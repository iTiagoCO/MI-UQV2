import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearAsignaturasPage } from './crear-asignaturas.page';

const routes: Routes = [
  {
    path: '',
    component: CrearAsignaturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearAsignaturasPageRoutingModule {}
