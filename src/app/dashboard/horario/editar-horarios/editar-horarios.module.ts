import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarHorariosPageRoutingModule } from './editar-horarios-routing.module';

import { EditarHorariosPage } from './editar-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarHorariosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarHorariosPage]
})
export class EditarHorariosPageModule {}
