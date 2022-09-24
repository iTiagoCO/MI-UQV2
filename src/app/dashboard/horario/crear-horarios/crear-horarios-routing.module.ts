import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearHorariosPage } from './crear-horarios.page';

const routes: Routes = [
  {
    path: '',
    component: CrearHorariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearHorariosPageRoutingModule {}
