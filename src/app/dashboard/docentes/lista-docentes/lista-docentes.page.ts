import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-lista-docentes',
  templateUrl: './lista-docentes.page.html',
  styleUrls: ['./lista-docentes.page.scss'],
})
export class ListaDocentesPage implements OnInit {
  term: string = '';
  arrData : any;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private db: AngularFirestore
  ) { 
    this.arrDataObservable = this.db.collection('users', ref => ref.where('tipo','==','docente').orderBy('clave')).valueChanges();
    this.arrDataObservable.subscribe(data => {
      this.arrData = data.map(e => {
        return {
          id: e.uid,
          nombre: e.nombre,
          clave: e.clave,
          estatus: e.estatus,
          photoURL: e.photoURL,
          tipo: e.tipo
        }
      });
    });
  }

  ngOnInit() {
  }

  add() {
    this.navController.navigateForward('/dashboard/crear-docentes');
  }

  edit(item) {
    this.storageService.setItem('docente',item);
    this.navController.navigateForward('dashboard/editar-docentes');
  }
}
