import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  term:string = '';
  arrData : any;
  dataGrupo: Observable<any>;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.storageService.getItem('grupo').subscribe((data:any) => {
      this.dataGrupo = this.db.doc(`grupos/${data.grupo}`).valueChanges();
      // Get data Tareas del grupo
      this.arrDataObservable = this.db.collection('grupos/'+data.grupo+'/tareas', ref => ref.orderBy('nombre')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }
        )));
    });
  }

  add() {
    this.navController.navigateForward('/docente/tareas/crear-tareas');
  }

  edit(item) {
    this.storageService.setItem('tarea', item);
    this.navController.navigateForward('/docente/tareas/editar-tareas');
  }
}
