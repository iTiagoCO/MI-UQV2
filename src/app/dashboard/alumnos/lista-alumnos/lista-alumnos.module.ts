import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAlumnosPageRoutingModule } from './lista-alumnos-routing.module';

import { ListaAlumnosPage } from './lista-alumnos.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAlumnosPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListaAlumnosPage]
})
export class ListaAlumnosPageModule {}
