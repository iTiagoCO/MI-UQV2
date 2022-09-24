import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAsignaturasPageRoutingModule } from './lista-asignaturas-routing.module';

import { ListaAsignaturasPage } from './lista-asignaturas.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAsignaturasPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListaAsignaturasPage]
})
export class ListaAsignaturasPageModule {}
