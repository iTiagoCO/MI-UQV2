import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaFacultadesPageRoutingModule } from './lista-facultades-routing.module';

import { ListaFacultadesPage } from './lista-facultades.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaFacultadesPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListaFacultadesPage]
})
export class ListaFacultadesPageModule {}
