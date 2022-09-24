import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarFacultadesPageRoutingModule } from './editar-facultades-routing.module';

import { EditarFacultadesPage } from './editar-facultades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarFacultadesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarFacultadesPage]
})
export class EditarFacultadesPageModule {}
