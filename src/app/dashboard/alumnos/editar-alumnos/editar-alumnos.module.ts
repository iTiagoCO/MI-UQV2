import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarAlumnosPageRoutingModule } from './editar-alumnos-routing.module';

import { EditarAlumnosPage } from './editar-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarAlumnosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarAlumnosPage]
})
export class EditarAlumnosPageModule {}
