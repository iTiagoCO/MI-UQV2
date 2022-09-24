import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.page.html',
  styleUrls: ['./lista-alumnos.page.scss'],
})
export class ListaAlumnosPage implements OnInit {
  term:string = '';
  arrData : any;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private databaseService: DatabaseService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.arrDataObservable = this.db.collection('users', ref=> ref.where('tipo','==','usuario').orderBy('nombre')).valueChanges();
  }


  edit(alumno) {
    this.storageService.setItem('alumno', alumno);
    this.navController.navigateForward('dashboard/editar-alumnos');
  }
}
