import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-grupo-opciones',
  templateUrl: './grupo-opciones.component.html',
  styleUrls: ['./grupo-opciones.component.scss']
})
export class GrupoOpcionesComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private navController: NavController,
    private popOverController: PopoverController
  ) { }

  ngOnInit() {}
  
  chat() {
    this.popOverController.dismiss();
    this.navController.navigateForward('/alumno/grupo/chat');
  }
  
  tareas() {
    this.popOverController.dismiss();
    this.navController.navigateForward('/alumno/grupo/tareas');
  }

  comollegar() {
    this.popOverController.dismiss();
    this.navController.navigateForward('/alumno/grupo/map');
  }

  docente() {
    this.popOverController.dismiss();
    this.navController.navigateForward('/alumno/grupo/docente');
  }
}