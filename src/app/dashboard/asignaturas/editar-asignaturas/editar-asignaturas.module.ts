import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarAsignaturasPageRoutingModule } from './editar-asignaturas-routing.module';

import { EditarAsignaturasPage } from './editar-asignaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarAsignaturasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarAsignaturasPage]
})
export class EditarAsignaturasPageModule {}
