import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarHorariosPage } from './editar-horarios.page';

const routes: Routes = [
  {
    path: '',
    component: EditarHorariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarHorariosPageRoutingModule {}
