import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storageService.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // Place the code below into your own component or use the full template
  userAngularDocument: Observable<any>
  userData:any;
  imageUser:string = './assets/default_user_picture.jpg';
  docentesCount = 0;
  alumnosCount = 0;
  gruposCount = 0;
  facultadesCount = 0;
  constructor(
      private db: AngularFirestore,
      private storageService: StorageService,
      private menuController: MenuController,
      private navController: NavController
  ) {}
  
  ngOnInit() {
        this.storageService.getItem('userData').subscribe(res => {
            this.userData = res;
            this.imageUser = `${this.userData.photoURL==null?'./assets/default_user_picture.jpg':this.userData.photoURL}`;
            this.menuController.enable(true);
        });
        // Alumns Counter
        this.db.collection('users',ref=>ref.where('tipo','==','usuario').orderBy('nombre')).valueChanges().subscribe(data => {
            this.alumnosCount = data.length;
        });
        // Gropos Counter
        this.db.collection('grupos').valueChanges().subscribe(data => {
            this.gruposCount = data.length;
        });
        // Docentes Counter
        this.db.collection('users', ref=> ref.where('tipo','==','docente').orderBy('nombre')).valueChanges().subscribe(data => {
            this.docentesCount = data.length;
        });
        // Docentes Counter
        this.db.collection('facultades').valueChanges().subscribe(data => {
            this.facultadesCount = data.length;
        });
    }

    facultades() {
        this.navController.navigateForward('/dashboard/lista-facultades');
    }

    docentes() {
        this.navController.navigateForward('/dashboard/lista-docentes');
    }

    asignaturas() {
        this.navController.navigateForward('/dashboard/lista-asignaturas');
    }

    grupos() {
        this.navController.navigateForward('/dashboard/lista-grupos');
    }

    alumnos() {
        this.navController.navigateForward('/dashboard/lista-alumnos');
    }
}
