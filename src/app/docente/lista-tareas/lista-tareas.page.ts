import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.page.html',
  styleUrls: ['./lista-tareas.page.scss'],
})
export class ListaTareasPage implements OnInit {
  term:string = '';
  arrData : any;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private db: AngularFirestore,
    private databaseService: DatabaseService,
  ) { 
    this.storageService.getItem('userData').subscribe((data:any) => {
      this.db.collection('grupos', ref=> ref.where('docente','==',data.uid)).ref.get().then(res => {
        this.arrData = [];
        res.forEach(doc => {
          let data:any = doc.data();
          data.id = doc.id;
          this.arrData.push(data);
        });
      });
    });    
  }
  ngOnInit() {
  }


  chat(grupo) {
    this.storageService.setItem('grupo', {grupo: grupo.id});
    this.navController.navigateForward('/docente/tareas');
  }
}
