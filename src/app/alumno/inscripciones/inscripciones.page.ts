import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.page.html',
  styleUrls: ['./inscripciones.page.scss'],
})
export class InscripcionesPage implements OnInit {

  term:string = '';
  arrData : any;
  dataUser;any;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private db: AngularFirestore,
    private databaseService: DatabaseService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private utils: UtilsService
  ) { }

  async ngOnInit() {
    this.storageService.getItem('userData').subscribe(async (data) => {
      this.dataUser = data;
      this.databaseService.getAll('grupos').then((data)=> {
        data.subscribe(actions => {
          this.arrData = actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
          this.arrData.map(element => {
            // verify if user already inscribed to this group
            this.db.collection('inscripciones',ref=> ref.where('grupo','==',element.id)).valueChanges().subscribe((data:any) => {
              if(data.length > 0) {
                element.inscrito = true;
              } else {
                element.inscrito = false;
              }
            });
            this.db.collection('users',ref =>  ref.where('uid','==',element.docente)).valueChanges().subscribe((data:any) => {
              if(data.length > 0) {
                element.docente = data[0];
              }
            });
            return element;
          });
          loading.dismiss();
        });
      });
    });
    // retrieve groups on user not already inscripted using firebase
    let loading = await this.loadingController.create({
      message: 'Cargando...',
      mode:'ios'
    });
    loading.present();
  }
  async inscribirse(grupo) {
    console.log(grupo.id,this.dataUser.uid);
    if(grupo.inscrito == true) {
      let confirm = await this.alertController.create({
        header: 'Ya estas inscrito',
        message: '¿Deseas abandonar el grupo?',
        mode:'ios',
        buttons: [
          {
            text:'Cancelar',
            role:'cancel'
          },
          {
            text:'Aceptar',
            handler: async () => {
              let loading = await this.loadingController.create({
                message:'Abandonando grupo...',
                mode:'ios'
              });
              loading.present();
              // serach on inscripciones collection by alumno and grupo then delete
              this.db.collection('inscripciones',ref => ref.where('alumno','==',this.dataUser.uid).where('grupo','==',grupo.id)).get().subscribe((data:any) => {
                data.forEach((doc:any) => {
                    this.db.collection('inscripciones').doc(doc.id).delete().then(() => {
                      // remove from collection alumnos on collection grupos
                      this.db.collection('grupos').doc(grupo.id).collection('alumnos').doc(this.dataUser.uid).delete();
                      loading.dismiss();
                      this.utils.showAlert('Se ha abandonado el grupo');
                  }).catch((error) => {
                    loading.dismiss();
                    this.utils.showAlert('Error al abandonar el grupo');
                  });
                });
              });
            }
          }
        ]
      });
      confirm.present();
    } else {
      let confirm = await this.alertController.create({
        header: 'Inscribirse',
        message: '¿Está seguro que desea inscribirse al grupo?',
        mode:'ios',
        buttons: [
          {
            text:'Cancelar',
            role:'cancel'
          },
          {
            text:'Aceptar',
            handler: async () => {
              let loading = await this.loadingController.create({
                message:'Procesando...',
                mode:'ios'
              });
              loading.present();
              this.db.collection('inscripciones').add({
                alumno:this.dataUser.uid,
                asignatura:grupo.asignatura,
                grupo: grupo.id,
              }).then(() => {
                // add to grupos document on alumnos collection
                this.db.collection('grupos').doc(grupo.id).collection('alumnos').doc(this.dataUser.uid).set({
                  alumno: this.dataUser.uid??'',
                  nombre: this.dataUser.nombre??'',
                  paterno: this.dataUser.paterno??'',
                  materno: this.dataUser.materno??'',
                  photoURL: this.dataUser.photoURL??''
                });
                this.utils.showAlert('Inscripción exitosa');
              }).catch((err) => { console.log(err)
                this.utils.showAlert('Error al inscribirse');
              }).finally(()=> {
                loading.dismiss();
              });
            }
          }
        ]
      });
      confirm.present();
    }
  }
}
