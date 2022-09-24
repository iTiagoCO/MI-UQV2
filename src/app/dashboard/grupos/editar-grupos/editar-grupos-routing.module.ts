import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarGruposPage } from './editar-grupos.page';

const routes: Routes = [
  {
    path: '',
    component: EditarGruposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarGruposPageRoutingModule {}
