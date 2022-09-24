import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAlumnosGruposPageRoutingModule } from './lista-alumnos-grupos-routing.module';

import { ListaAlumnosGruposPage } from './lista-alumnos-grupos.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAlumnosGruposPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListaAlumnosGruposPage]
})
export class ListaAlumnosGruposPageModule {}
