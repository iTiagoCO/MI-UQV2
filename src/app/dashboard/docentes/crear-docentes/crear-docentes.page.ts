import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-crear-docentes',
  templateUrl: './crear-docentes.page.html',
  styleUrls: ['./crear-docentes.page.scss'],
})
export class CrearDocentesPage implements OnInit {

  public form: FormGroup;
  userImage = './assets/default_user_picture.jpg';
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController,
    private utils: UtilsService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { 
    this.form = this.formBuilder.group({
      photoURL: [this.userImage, Validators.required], 
      nombre: ['', Validators.required],
      clave: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      estatus: ['', Validators.required],
    })
  }

  tomarGaleria() {
    this.utils.takePhotoFromGallery().then((photo) => {
      if(photo) {
        this.userImage = photo;
        this.form.get('photoURL').setValue(photo);
      }
     }).catch((err) => {
       console.log(err);
       this.utils.showToast('No ha sido posible tomar foto, por favor verifique los permisos de aplicación.');
     });
  }

  ngOnInit() {
  }

  save() {
    // create account firebase auth  email and password
    this.afAuth.createUserWithEmailAndPassword(this.form.get('email').value, this.form.get('password').value).then((user) => {
      const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.user.uid}`);
      const data = {
        uid: user.user.uid,
        email: this.form.get('email').value,
        nombre: this.form.get('nombre').value,
        clave: this.form.get('clave').value,
        estatus: this.form.get('estatus').value,
        photoURL: this.form.get('photoURL').value,
        tipo: 'docente'
      }
      userRef.set(data, { merge: true });
      this.utils.showToast('Docente creado correctamente.');
      this.navController.back();
    }).catch((err) => {
      if(err.code == 'auth/email-already-in-use') {
        this.utils.showToast('El correo electrónico ya está en uso.');
      } else if(err.code == 'auth/invalid-email') {
        this.utils.showToast('El correo electrónico no es válido.');
      } else if(err.code == 'auth/weak-password') {
        this.utils.showToast('La contraseña es muy débil.');
      } else {
        this.utils.showToast('No se pudo crear el docente.');
      }
    });
  }
}
