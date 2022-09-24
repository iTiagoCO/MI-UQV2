import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasPage } from './tareas.page';

const routes: Routes = [
  {
    path: '',
    component: TareasPage
  },
  {
    path: 'editar-tareas',
    loadChildren: () => import('./editar-tareas/editar-tareas.module').then( m => m.EditarTareasPageModule)
  },
  {
    path: 'crear-tareas',
    loadChildren: () => import('./crear-tareas/crear-tareas.module').then( m => m.CrearTareasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasPageRoutingModule {}
