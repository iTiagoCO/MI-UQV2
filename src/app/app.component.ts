import { Component } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storageService.service';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userData:any;
  imageUser:string = './assets/default_user_picture.jpg';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private navController: NavController,
    private menuController: MenuController,
    private storageService: StorageService,
    private db: AngularFirestore,
    private geolocation: Geolocation
  ) { this.initializeApp(); }

  ngOnInit() {
    this.storageService.getItem('userData').subscribe(res => {
      this.userData = res;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
       //Listening Current Location
       const watch = this.geolocation.watchPosition();
       watch.subscribe((resp: any) => {
         if(resp) {
           this.storageService.setItem('currentGPS', {
             lat: resp.coords.latitude ,
             lng: resp.coords.longitude
           });
         }
       });
       this.auth.afAuth.authState.subscribe(user => {
        if (user) {
          let userId = JSON.parse(localStorage.getItem('userId'));
          this.db.collection('users').doc(userId.uid).ref.get().then(doc => {
            if (doc.exists) {
              if(user.emailVerified) {
                this.userData = doc.data();
                this.storageService.setItem('userData', doc.data());
                setTimeout(() => {
                  this.inicio();
                }, 1000);
              }
            }
          })
        } else {
          this.storageService.removeItem('userData');
        }
      });
    });
  }

  inicio() {
    let dataUser  = JSON.parse(localStorage.getItem('userData'));
    switch (dataUser.tipo) {
      case 'docente': {
        this.navController.navigateRoot('/docente');
        break;
      }
      case 'usuario': {
        this.navController.navigateRoot('/alumno');
        break;
      }
      case 'admin': {
        this.navController.navigateRoot('/dashboard');
        break;
      }
    }
  }

  perfil() {
    this.navController.navigateForward('/dashboard/perfil');
  }

  chats() {
    let dataUser  = JSON.parse(localStorage.getItem('userData'));
    switch (dataUser.tipo) {
      case 'docente': {
        this.navController.navigateForward('/docente/chats');
        break;
      }
      case 'usuario': {
        this.navController.navigateForward('/alumno/chats');
        break;
      }
    }
  }

  tareas() {
    let dataUser  = JSON.parse(localStorage.getItem('userData'));
    switch (dataUser.tipo) {
      case 'docente': {
        this.navController.navigateForward('/docente/lista-tareas');
        break;
      }
      case 'usuario': {
        this.navController.navigateForward('/alumno/tareas');
        break;
      }
    }
  }

  inscripciones() {
    this.navController.navigateForward('alumno/inscripciones')
  }

  logOut() {
    this.auth.logout();
    this.storageService.removeItem('userData');
    this.storageService.removeItem('userId');
    this.navController.navigateRoot('/login');
    this.menuController.enable(false);
  }
}
