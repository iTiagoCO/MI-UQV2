import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoPage } from './grupo.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoPage
  }, {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'tareas',
    loadChildren: () => import('./tareas/tareas.module').then( m => m.TareasPageModule)
  },
  {
    path: 'tarea',
    loadChildren: () => import('./tarea/tarea.module').then( m => m.TareaPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'docente',
    loadChildren: () => import('./docente/docente.module').then( m => m.DocentePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoPageRoutingModule {}
