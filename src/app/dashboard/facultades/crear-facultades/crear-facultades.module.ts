import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearFacultadesPageRoutingModule } from './crear-facultades-routing.module';

import { CrearFacultadesPage } from './crear-facultades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearFacultadesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearFacultadesPage]
})
export class CrearFacultadesPageModule {}
