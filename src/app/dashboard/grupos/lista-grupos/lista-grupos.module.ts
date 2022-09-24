import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaGruposPageRoutingModule } from './lista-grupos-routing.module';

import { ListaGruposPage } from './lista-grupos.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaGruposPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListaGruposPage]
})
export class ListaGruposPageModule {}
