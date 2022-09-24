import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarGruposPageRoutingModule } from './editar-grupos-routing.module';

import { EditarGruposPage } from './editar-grupos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarGruposPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarGruposPage]
})
export class EditarGruposPageModule {}
