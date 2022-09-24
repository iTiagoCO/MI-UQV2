import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-lista-asignaturas',
  templateUrl: './lista-asignaturas.page.html',
  styleUrls: ['./lista-asignaturas.page.scss'],
})
export class ListaAsignaturasPage implements OnInit {
  term:string = '';
  arrData : any;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private databaseService: DatabaseService
  ) { 
    this.databaseService.getAll('asignaturas').then((data)=> {
      this.arrDataObservable = data.pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }));
    });
  }

  ngOnInit() {
  }

  add() {
    this.navController.navigateForward('/dashboard/crear-asignaturas');
  }

  edit(docente) {
    this.storageService.setItem('asignatura', docente);
    this.navController.navigateForward('dashboard/editar-asignaturas');
    
  }
}
