import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public form: FormGroup;
  dataItem:any;
  userImage = './assets/default_user_picture.jpg';
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController,
    private storageService: StorageService,
    private alertController: AlertController,
    private utils: UtilsService
  ) {
    this.form = this.formBuilder.group({
      photoURL: [''],
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      materno: ['', Validators.required],
      paterno: ['', Validators.required]
    })
   }

  ngOnInit() {
    this.storageService.getItem('userData').subscribe((data:any) => {
      this.dataItem = data;
      console.log(data);
      if(this.dataItem.photoURL) { this.userImage = this.dataItem.photoURL; }
      this.form.get('photoURL').setValue(data.photoURL);
      this.form.controls['email'].setValue(data.email??'');
      this.form.controls['nombre'].setValue(data.nombre??'');
      this.form.controls['paterno'].setValue(data.paterno);
      this.form.controls['materno'].patchValue(data.materno);
    });
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

  save() {
    this.databaseService.update('users', this.dataItem.uid, {
      photoURL: this.form.get('photoURL').value,
      nombre: this.form.value.nombre,
      materno: this.form.value.materno,
      paterno: this.form.value.paterno,
    }).then(() => {
      this.dataItem.photoURL = this.form.get('photoURL').value;
      this.dataItem.nombre = this.form.value.nombre;
      this.dataItem.materno = this.form.value.materno;
      this.dataItem.paterno = this.form.value.paterno;
      this.storageService.setItem('userData', this.dataItem);
      this.utils.showToast('Datos actualizados correctamente.');
    }).catch(() => {
      this.utils.showToast('No ha sido posible actualizar los datos.');
    });
  }

  async remove() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Estás seguro de eliminar al docente?',
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
          text: 'Eliminar',
          handler: () => {
            this.databaseService.delete('docentes', this.dataItem.id).then(() => {
              this.navController.navigateBack('/dashboard/lista-docentes');
            })
          }
        }]
      });
      alert.present();
  }
}
