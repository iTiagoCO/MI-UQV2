import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearDocentesPageRoutingModule } from './crear-docentes-routing.module';

import { CrearDocentesPage } from './crear-docentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearDocentesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearDocentesPage]
})
export class CrearDocentesPageModule {}
