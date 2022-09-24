import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarDocentesPageRoutingModule } from './editar-docentes-routing.module';

import { EditarDocentesPage } from './editar-docentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarDocentesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarDocentesPage]
})
export class EditarDocentesPageModule {}
