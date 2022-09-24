import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTareasPageRoutingModule } from './editar-tareas-routing.module';

import { EditarTareasPage } from './editar-tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTareasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarTareasPage]
})
export class EditarTareasPageModule {}
