import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionesPageRoutingModule } from './inscripciones-routing.module';

import { InscripcionesPage } from './inscripciones.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionesPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [InscripcionesPage]
})
export class InscripcionesPageModule {}
