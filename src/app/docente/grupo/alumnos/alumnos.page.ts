import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  term:string = '';
  arrData : any;
  dataGrupo:any;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private storageService: StorageService,
    private db: AngularFirestore,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    let loading = await this.loadingController.create({
      mode:'ios',
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    loading.present();
    this.storageService.getItem('grupo').subscribe((data:any) => {
      this.dataGrupo = data;
      this.arrData = [];
      this.db.collection('grupos').doc(this.dataGrupo.grupo).collection('alumnos').ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc:any) => {
          // get id f doc
          let id = doc.id;
          console.log(doc.data());
          this.db.collection('users').doc(doc.data().alumno).ref.get().then((docAlumno:any) => {
            console.log(docAlumno.data());
            let data = docAlumno.data();
            data.id = id;
            this.arrData.push(data);
          });
        });
      }).finally(()=> {
        // pause to dra UI
        setTimeout(()=> {
          console.log(this.arrData)
          loading.dismiss();
        },1000);
      });
    });
  }

  async remove(alumno) {
    let alertConfirm = await this.alertController.create({
      header: 'Expulsar alumno',
      message: '¿Estás seguro de expulsar a '+alumno.nombre+' '+alumno.paterno+' '+alumno.materno+'?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Aceptar',
          handler: async () => {
            let loading = await this.loadingController.create({
              message: 'Expulsando alumno',
              spinner: 'bubbles',
              mode:'ios',
            });
            loading.present();
            this.db.collection('grupos').doc(this.dataGrupo.grupo).collection('alumnos').doc(alumno.id).delete().then(async ()=> {
              // remove user from inscripciones collection by grupo and alumno
              this.db.collection('inscripciones',ref => ref.where('alumno','==',alumno.uid).where('grupo','==',this.dataGrupo.grupo)).get().subscribe((data:any) => {
                data.forEach((doc:any) => {
                  this.db.collection('inscripciones').doc(doc.id).delete();
                });
              });
              let alert = await this.alertController.create({
                header: 'Eliminado',
                message: 'Alumno eliminado correctamente',
                mode:'ios',
                buttons: [
                  {
                    text: 'Aceptar',
                    handler: () => {
                      this.ngOnInit();
                    }
                  }]
              });
              alert.present();
              loading.dismiss();
            }).catch(async ()=> {
              loading.dismiss();
              let alert = await this.alertController.create({
                header: 'Error',
                message: 'Ocurrió un error al eliminar el alumno',
                mode:'ios',
                buttons: [
                  {
                    text: 'Aceptar',
                    handler: () => {
                      this.ngOnInit();
                    }
                  }]
              });
              alert.present();
            });
          }
        }
      ]
    });
    alertConfirm.present();
  }
}
