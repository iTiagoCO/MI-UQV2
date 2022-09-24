import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTareasPage } from './editar-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTareasPageRoutingModule {}
