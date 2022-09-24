import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDocentesPageRoutingModule } from './lista-docentes-routing.module';

import { ListaDocentesPage } from './lista-docentes.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDocentesPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListaDocentesPage]
})
export class ListaDocentesPageModule {}
