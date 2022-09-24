import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-editar-docentes',
  templateUrl: './editar-docentes.page.html',
  styleUrls: ['./editar-docentes.page.scss'],
})
export class EditarDocentesPage implements OnInit {
  userImage: string = './assets/default_user_picture.jpg';
  public form: FormGroup;
  dataItem:any;
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController,
    private storageService: StorageService,
    private alertController: AlertController,
    private utils: UtilsService
  ) {
    this.form = this.formBuilder.group({
      photoURL: ['', Validators.required],
      nombre: ['', Validators.required],
      clave: ['', Validators.required],
      estatus: ['', Validators.required],
    })
   }

  ngOnInit() {
    this.storageService.getItem('docente').subscribe((data:any) => {
      this.dataItem = data;
      this.form.get('photoURL').setValue(data.photoURL);
      this.form.controls['nombre'].setValue(data.nombre);
      this.form.controls['clave'].setValue(data.clave);
      this.form.controls['estatus'].patchValue(data.estatus);
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
    this.databaseService.update('docentes', this.dataItem.id, this.form.value).then(() => {
      this.navController.navigateBack('/dashboard/lista-docentes');
    })
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
            this.databaseService.delete('users', this.dataItem.id).then(() => {
              this.navController.navigateBack('/dashboard/lista-docentes');
            })
          }
        }]
      });
      alert.present();
  }

}
