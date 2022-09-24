import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarAlumnosPage } from './editar-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: EditarAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarAlumnosPageRoutingModule {}
