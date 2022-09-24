import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarDocentesPage } from './editar-docentes.page';

const routes: Routes = [
  {
    path: '',
    component: EditarDocentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarDocentesPageRoutingModule {}
