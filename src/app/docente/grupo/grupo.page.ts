import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.page.html',
  styleUrls: ['./grupo.page.scss'],
})
export class GrupoPage implements OnInit {
  dataQuery:any;//Datos d ela vista anterior
  // Handlers for Grupo
  dataGrupo:Observable<any>;
  dataGrupoSubscriber: Subscription;
  // Handlers for Horario
  dataHorario: Observable<any>;
  dataHorarioSubscriber: Subscription;
  // Handlers for Asignatura
  dataAsignatura: Observable<any>;
  dataAsignaturaSubscriber: Subscription;
  // Handler for Alumnos
  arrAlumnos = [];
  // General vars
  term:string = '';
  constructor(
    private db: AngularFirestore,
    private storageService: StorageService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.dataQuery = this.storageService.getItem('grupo').subscribe((data:any) => {
      // Get data grupo from firebase
      this.dataGrupo = this.db.doc(`grupos/${data.grupo}`).valueChanges();
      this.dataGrupoSubscriber = this.dataGrupo.subscribe();
      // Get list of users
      // Data Alumnos
      this.db.collection('grupos').doc(data.grupo).collection('alumnos').ref.get().then((querySnapshot) => {
        this.arrAlumnos = [];
        querySnapshot.forEach((doc:any) => {
          // get id f doc
          let id = doc.id;
          this.db.collection('users').doc(doc.data().uid).ref.get().then((docAlumno:any) => {
            let data = docAlumno.data();
            data.id = id;
            this.arrAlumnos.push(data);
          });
        });
      });
      // Get data horario from firebase
      this.dataHorario = this.db.doc(`horarios/${data.horario}`).valueChanges();
      this.dataHorarioSubscriber = this.dataHorario.subscribe();
    });
  }

  ionViewWillLeave() {
   this.dataGrupoSubscriber.unsubscribe();
  }

  tareas() {
    this.navController.navigateForward('/docente/tareas');
  }

  chat() {
    this.navController.navigateForward('/docente/grupo/chat');
  }
}
