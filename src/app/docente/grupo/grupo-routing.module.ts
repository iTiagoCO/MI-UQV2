import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoPage } from './grupo.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoPage
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoPageRoutingModule {}
