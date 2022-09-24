import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarAsignaturasPage } from './editar-asignaturas.page';

const routes: Routes = [
  {
    path: '',
    component: EditarAsignaturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarAsignaturasPageRoutingModule {}
