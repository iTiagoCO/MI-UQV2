import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearGruposPageRoutingModule } from './crear-grupos-routing.module';

import { CrearGruposPage } from './crear-grupos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearGruposPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearGruposPage]
})
export class CrearGruposPageModule {}
