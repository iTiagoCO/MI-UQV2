import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'lista-docentes',
    loadChildren: () => import('./docentes/lista-docentes/lista-docentes.module').then( m => m.ListaDocentesPageModule)
  },
  {
    path: 'crear-docentes',
    loadChildren: () => import('./docentes/crear-docentes/crear-docentes.module').then( m => m.CrearDocentesPageModule)
  },
  {
    path: 'editar-docentes',
    loadChildren: () => import('./docentes/editar-docentes/editar-docentes.module').then( m => m.EditarDocentesPageModule)
  },
  {
    path: 'crear-asignaturas',
    loadChildren: () => import('./asignaturas/crear-asignaturas/crear-asignaturas.module').then( m => m.CrearAsignaturasPageModule)
  },
  {
    path: 'lista-asignaturas',
    loadChildren: () => import('./asignaturas/lista-asignaturas/lista-asignaturas.module').then( m => m.ListaAsignaturasPageModule)
  },
  {
    path: 'editar-asignaturas',
    loadChildren: () => import('./asignaturas/editar-asignaturas/editar-asignaturas.module').then( m => m.EditarAsignaturasPageModule)
  },
  {
    path: 'editar-grupos',
    loadChildren: () => import('./grupos/editar-grupos/editar-grupos.module').then( m => m.EditarGruposPageModule)
  },
  {
    path: 'lista-grupos',
    loadChildren: () => import('./grupos/lista-grupos/lista-grupos.module').then( m => m.ListaGruposPageModule)
  },
  {
    path: 'crear-grupos',
    loadChildren: () => import('./grupos/crear-grupos/crear-grupos.module').then( m => m.CrearGruposPageModule)
  },
  {
    path: 'lista-alumnos',
    loadChildren: () => import('./alumnos/lista-alumnos/lista-alumnos.module').then( m => m.ListaAlumnosPageModule)
  },
  {
    path: 'editar-alumnos',
    loadChildren: () => import('./alumnos/editar-alumnos/editar-alumnos.module').then( m => m.EditarAlumnosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'lista-horarios',
    loadChildren: () => import('./horario/lista-horarios/lista-horarios.module').then( m => m.ListaHorariosPageModule)
  },
  {
    path: 'crear-horarios',
    loadChildren: () => import('./horario/crear-horarios/crear-horarios.module').then( m => m.CrearHorariosPageModule)
  },
  {
    path: 'editar-horarios',
    loadChildren: () => import('./horario/editar-horarios/editar-horarios.module').then( m => m.EditarHorariosPageModule)
  },
  {
    path: 'lista-alumnos-grupos',
    loadChildren: () => import('./grupos/lista-alumnos-grupos/lista-alumnos-grupos.module').then( m => m.ListaAlumnosGruposPageModule)
  },
  {
    path: 'lista-facultades',
    loadChildren: () => import('./facultades/lista-facultades/lista-facultades.module').then( m => m.ListaFacultadesPageModule)
  },
  {
    path: 'crear-facultades',
    loadChildren: () => import('./facultades/crear-facultades/crear-facultades.module').then( m => m.CrearFacultadesPageModule)
  },
  {
    path: 'editar-facultades',
    loadChildren: () => import('./facultades/editar-facultades/editar-facultades.module').then( m => m.EditarFacultadesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
