import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { StorageService } from './storageService.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
    private alertController: AlertController,
    private storageService: StorageService
    ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginWithGoogle() {
    // let loading = await this.loadingController.create({
    //   message: 'Procesando...',
    //   animated: true,
    //   spinner: 'dots',
    //   mode:'ios'
    // });
    // loading.present()
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const  { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.updateUserData(user);
        return user;
        // loading.dismiss();
        // this.googlePlus.login({
        //   'webClientId': environment.googleWebClientId,
        //   'offline': true
        // })
        // .then((res:any) => {
        //   let user_data_google:any = res;
        //   console.log(user_data_google);
        //   this.afAuth
        //     .signInWithCredential(
        //       firebase.auth.GoogleAuthProvider.credential(res.idToken)
        //     )
        //     .then( async(data:any) => {
        //         this.updateUserData(data);
        //       })
        //       .catch((err)=> {
        //         this.utils.showAlert('Acceso incorrecto.'+ JSON.stringify(err));
        //       });
        //   })
        //     .catch( error => {
        //       console.log("Firebase failure: " + JSON.stringify(error));
        //       this.utils.showAlert('Acceso incorrecto.');
        //     }).finally(()=> loading.dismiss());
  };
  async register(email: string, password: string): Promise<any> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.updateUserData(user);
      await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      if(error.code == 'auth/email-already-in-use') {
        let message = await  this.alertController.create({
          mode: 'ios',
          header: 'Información',
          message: 'El email ya esta en uso',
          buttons: ['OK']
        });
        message.present();
       }
      console.log('Error->', error);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      // logout
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await this.afAuth.signOut();
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
      if(error.code == 'auth/user-not-found') {
        let message = await  this.alertController.create({
          mode: 'ios',
          header: 'Información',
          message: 'El usuario no existe',
          buttons: ['OK']
        });
        message.present();
      }
      if(error.code == 'auth/wrong-password') {
        let message = await  this.alertController.create({
          mode: 'ios',
          header: 'Información',
          message: 'Contraseña incorrecta',
          buttons: ['OK']
        });
        message.present();
      }
    }
  }

  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  updateUserData(user:any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    userRef.ref.get().then(async (doc) => {
      if (!doc.exists) {
        const data: User = {
          uid: user.uid,
          photoURL: user.photoURL || 'https://img.icons8.com/office/344/user.png',
          email: user.email,
          emailVerified: user.emailVerified,
          nombre: user.displayName,
          tipo: user.tipo || 'usuario'
        }
        return userRef.set(data, { merge: true });
      }
    });
    this.storageService.setItem('userId', {uid: user.uid});
  }
}
