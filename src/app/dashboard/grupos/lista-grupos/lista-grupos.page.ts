import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.page.html',
  styleUrls: ['./lista-grupos.page.scss'],
})
export class ListaGruposPage implements OnInit {
  term:string = '';
  arrData : any;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private db: AngularFirestore,
    private databaseService: DatabaseService,
  ) { 
    
    this.databaseService.getAll('grupos').then((data)=> {
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
    this.navController.navigateForward('/dashboard/crear-grupos');
  }

  edit(item) {
    this.storageService.setItem('grupo', item.id);
    this.navController.navigateForward('dashboard/editar-grupos');
  }
}
