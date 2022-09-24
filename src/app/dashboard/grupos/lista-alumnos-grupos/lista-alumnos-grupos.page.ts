import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-lista-alumnos-grupos',
  templateUrl: './lista-alumnos-grupos.page.html',
  styleUrls: ['./lista-alumnos-grupos.page.scss'],
})
export class ListaAlumnosGruposPage implements OnInit {
  term: string = '';
  dataGrupo:any;
  dataAsignatura:any;
  dataDocente:any;
  arrAlumnos:any;
  idGrupo:any;
  constructor(
    private databaseService: DatabaseService,
    private storageService: StorageService,
    private navController: NavController,
    private alertController: AlertController,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    // Data Grupo
    this.storageService.getItem('grupo').subscribe((res:any) => {
        this.db.doc('grupos/'+res).ref.get().then((doc)=> {
          if(doc.exists) {
            this.idGrupo = doc.id;
            this.dataGrupo = doc.data();
            res = this.dataGrupo;
            // Data Asignatura
            this.db.collection('asignaturas').doc(res.asignatura).ref.get().then((doc) => {
              this.dataAsignatura = doc.data();
              console.log(this.dataAsignatura);
            });
            // Data Docente
            this.db.collection('users').doc(res.docente).ref.get().then((doc) => {
              this.dataDocente = doc.data();
              console.log(this.dataDocente);
            });
            // Data Alumnos
            this.db.collection('grupos').doc(this.idGrupo).collection('alumnos').ref.get().then((querySnapshot) => {
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
              console.log(this.arrAlumnos);
            });
          }
      });
    });
  }

  expulsar(alumno) {
    console.log(alumno);
    this.alertController.create({
      header: 'Confirmar',
      message: '¿Está seguro de expulsar al alumno?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.db.collection('grupos').doc(this.idGrupo).collection('alumnos').doc(alumno.id).delete();
            this.ngOnInit();
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  add() {
    this.navController.navigateForward('dashboard/crear-alumnos-grupos');
  }
}
