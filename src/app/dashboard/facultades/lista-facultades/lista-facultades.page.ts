import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-lista-facultades',
  templateUrl: './lista-facultades.page.html',
  styleUrls: ['./lista-facultades.page.scss'],
})
export class ListaFacultadesPage implements OnInit {
  term: string = '';
  arrData : any;
  arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private database: DatabaseService
  ) { }

  ngOnInit() {
    this.database.getAll('facultades').then((data)=> {
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


  add() {
    this.navController.navigateForward('/dashboard/crear-facultades');
  }

  edit(facultad) {
    this.storageService.setItem('facultad',facultad);
    this.navController.navigateForward('/dashboard/editar-facultades');
  }
}
