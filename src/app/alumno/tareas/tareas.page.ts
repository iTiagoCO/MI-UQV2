import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController } from '@ionic/angular';
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
  arrAsignaturas:any[] = [];
  userData:any;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private db: AngularFirestore,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    let loading = await this.loadingController.create({
      message:'Cargando...',
      mode:'ios'
    });
    loading.present();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.arrAsignaturas = [];
    this.db.collection('inscripciones', ref => ref.where('alumno','==', this.userData.uid)).get().subscribe(res => {
      res.forEach(doc => {
        let data:any = doc.data();
        console.log(data.grupo);
        // read horarios collection
        this.db.collection('horarios').ref.where('grupo', '==', data.grupo).get().then((res) => {
                                              res.forEach(doc => {
                                                let data:any = doc.data();
                                                console.log(data);
                                                data.grupoData = this.db.doc(`grupos/${data.grupo}`).valueChanges();
                                                // check by asignatura key if item already exist on array
                                                let exist = this.arrAsignaturas.find(item => item.asignatura == data.asignatura);
                                                if(!exist) {
                                                  this.arrAsignaturas.push(data);
                                                }
                                              });
                                          }).finally(()=> {
                                            // order by inicio  as asc
                                            console.log(this.arrAsignaturas);
                                            this.arrAsignaturas.sort((a,b) => {
                                              return a.inicio - b.inicio;
                                            });
                                            loading.dismiss();
                                          });
    });
  });
}

  tareas(grupo:any) {
    this.storageService.setItem('grupo', {horario: grupo.id, grupo: grupo.grupo});
    this.navController.navigateForward('alumno/grupo/tareas');
  }
}
