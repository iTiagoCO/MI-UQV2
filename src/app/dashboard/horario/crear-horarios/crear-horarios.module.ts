import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearHorariosPageRoutingModule } from './crear-horarios-routing.module';

import { CrearHorariosPage } from './crear-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearHorariosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearHorariosPage]
})
export class CrearHorariosPageModule {}
