import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { StorageService } from '../services/storageService.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {
  arrAsignaturasDiaSemana:any = [];
  imageUser:string = './assets/default_user_picture.jpg';
  arrAsignaturas:any[] = [];
  vista:string = 'hoy';
  vistaDiaria:string = 'Lunes';
  currentDayOfWeek = "Lunes"
  dataDocente:any;
  fechaHoy = new Date();
  constructor(
    private db: AngularFirestore,
    private navController: NavController,
    private storageService: StorageService,
    private loadingController: LoadingController
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
    this.dataDocente = JSON.parse(localStorage.getItem('userData'));
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
    this.db.collection('horarios').ref.where('docente', '==', this.dataDocente.uid)
                                      .where('dia_nombre','==', this.currentDayOfWeek)
                                      .orderBy('inicio', 'asc')
    .get().then(res => {
      this.arrAsignaturas = [];
      res.forEach(doc => {
        let data:any = doc.data();
        data.grupoData = this.db.doc(`grupos/${data.grupo}`).valueChanges();
        this.arrAsignaturas.push(data);
        // add id
        data.id = doc.id;
      });
      console.log(this.arrAsignaturas);
    }).finally(()=> {
      loading.dismiss();
    });
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
    this.db.collection('horarios').ref.where('docente', '==', this.dataDocente.uid)
                                  .where('dia_nombre','==', this.vistaDiaria)
                                  .orderBy('inicio', 'asc')
    .get().then(res => {
      this.arrAsignaturasDiaSemana = [];
      res.forEach(doc => {
        let data:any = doc.data();
        data.grupoData = this.db.doc(`grupos/${data.grupo}`).valueChanges();
        this.arrAsignaturasDiaSemana.push(data);
        // add id
        data.id = doc.id;
      });
      console.log(this.arrAsignaturasDiaSemana);
    }).finally(()=> {
      loading.dismiss();
    });
  }

  verGrupo(grupo:any) {
    this.storageService.setItem('grupo', {horario: grupo.id, grupo: grupo.grupo});
    this.navController.navigateForward('docente/grupo');
  }
}
