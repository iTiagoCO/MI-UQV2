import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, PopoverController } from '@ionic/angular';
import { StorageService } from '../services/storageService.service';
import * as moment from 'moment';
import { GrupoOpcionesComponent } from './components/grupo-opciones/grupo-opciones.component';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  arrAsignaturasDiaSemana:any = [];
  imageUser:string = './assets/default_user_picture.jpg';
  arrAsignaturas:any[] = [];
  vista:string = 'hoy';
  vistaDiaria:string = 'Lunes';
  currentDayOfWeek = "Lunes"
  userData:any;
  fechaHoy = new Date();
  constructor(
    private db: AngularFirestore,
    private navController: NavController,
    private storageService: StorageService,
    private loadingController: LoadingController,
    private popOverController: PopoverController
  ) {}

  ionViewWillEnter() {
    this.fechaHoy = new Date();
  }

  async ngOnInit() {
    let loading = await this.loadingController.create({
      message:'Cargando...',
      mode:'ios'
    });
    loading.present();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    // get horarios when group owner is logged in and current day using moment
    let day = moment().day();
    this.currentDayOfWeek = "Lunes";
    switch(day) {
      case 0: {
        this.vistaDiaria = 'Domingo';
        this.currentDayOfWeek = 'Domingo';
        break;
      }
      case 1: {
        this.vistaDiaria = 'Lunes';
        this.currentDayOfWeek = 'Lunes';
        break;
      }
      case 2: {
        this.vistaDiaria = 'Martes';
        this.currentDayOfWeek = 'Martes';
        break;
      }
      case 3: {
        this.vistaDiaria = 'Miércoles';
        this.currentDayOfWeek = 'Miércoles';
        break;
      }
      case 4: {
        this.vistaDiaria = 'Jueves';
        this.currentDayOfWeek = 'Jueves';
        break;
      }
      case 5: {
        this.vistaDiaria = 'Viernes';
        this.currentDayOfWeek = 'Viernes';
        break;
      }
      case 6: {
        this.vistaDiaria = 'Sábado';
        this.currentDayOfWeek = 'Sábado';
        break;
      }
    }
    this.db.collection('inscripciones', ref => ref.where('alumno','==', this.userData.uid)).get().subscribe(res => {
      this.arrAsignaturas = [];
      res.forEach(doc => {
        let data:any = doc.data();
        // read horarios collection
        this.db.collection('horarios').ref.where('grupo', '==', data.grupo)
                                          //.where('dia_nombre','==', this.currentDayOfWeek)
                                          .orderBy('inicio','asc').get().then(res => {
                                              res.forEach(doc => {
                                                let data:any = doc.data();
                                                data.grupoData = this.db.doc(`grupos/${data.grupo}`).valueChanges();
                                                this.arrAsignaturas.push(data);
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
  //
  setTimeout(()=> {
    loading.dismiss();
  },2500);
}

  segmentVista(ev: any) {
    this.vista = ev.detail.value;
    if(this.vista == 'semana') {
      this.segmentVistaDiaSemana({detail:{value:this.currentDayOfWeek}});
    }
  }

  async segmentVistaDiaSemana(ev: any) {
    let loading = await this.loadingController.create({
      message:'Cargando...',
      mode:'ios'
    });
    loading.present();
    this.vistaDiaria = ev.detail.value;
    console.log(this.vistaDiaria);
    this.arrAsignaturasDiaSemana = [];
    this.db.collection('inscripciones', ref => ref.where('alumno','==', this.userData.uid)).get().subscribe(res => {
        res.forEach(doc => {
          let data:any = doc.data();
          console.log();
          this.db.collection('horarios').ref.where('grupo', '==', data.grupo)
                                        .where('dia_nombre','==', this.vistaDiaria)
                                        .orderBy('inicio','asc')
                                        .get().then(res => {
                                          console.log(res);
              res.forEach(doc => {
                let data:any = doc.data();
                console.log(data);
                data.grupoData = this.db.doc(`grupos/${data.grupo}`).valueChanges();
                this.arrAsignaturasDiaSemana.push(data);
              });
          })
      });
      console.log(this.arrAsignaturasDiaSemana);
      loading.dismiss();
    });
  }

  async grupoOpciones(event,item:any) {
    console.log(item.grupo);
    this.storageService.setItem('grupo',{grupo: item.grupo});
    // popover element
    let popover = await this.popOverController.create({
      component: GrupoOpcionesComponent,
      event: event,
      mode:'ios'
    });
    popover.present();
  }
}
