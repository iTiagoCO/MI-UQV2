import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTareasPageRoutingModule } from './lista-tareas-routing.module';

import { ListaTareasPage } from './lista-tareas.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTareasPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListaTareasPage]
})
export class ListaTareasPageModule {}
