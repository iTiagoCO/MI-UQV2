import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-editar-alumnos',
  templateUrl: './editar-alumnos.page.html',
  styleUrls: ['./editar-alumnos.page.scss'],
})
export class EditarAlumnosPage implements OnInit {
  public form: FormGroup;
  dataItem:any;
  userImage = './assets/default_user_picture.jpg';
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController,
    private storageService: StorageService,
    private utils: UtilsService
  ) {
    this.form = this.formBuilder.group({
      photoURL: [''],
      email:['', Validators.required],
      nombre: ['', Validators.required],
      materno: ['', Validators.required],
      paterno: ['', Validators.required]
    })
   }

  ngOnInit() {
    this.storageService.getItem('alumno').subscribe((data:any) => {
      console.log(data);
      this.dataItem = data;
      if(this.dataItem.photoURL) { this.userImage = this.dataItem.photoURL; }
      this.form.get('photoURL').setValue(data);
      this.form.controls['photoURL'].setValue(data.photoURL??'https://img.icons8.com/office/344/user.png');
      this.form.controls['email'].setValue(data.email??'');
      this.form.controls['nombre'].setValue(data.nombre??'');
      this.form.controls['paterno'].setValue(data.paterno);
      this.form.controls['materno'].patchValue(data.materno);
    });
  }

  save() {
    this.databaseService.update('users', this.dataItem.uid, {
      photoURL: this.form.get('photoURL').value,
      nombre: this.form.value.nombre,
      materno: this.form.value.materno,
      paterno: this.form.value.paterno
    }).then(() => {
      this.utils.showToast('Datos actualizados correctamente.');
      this.navController.back();
    }).catch((err) => {
      console.log(err);
      this.utils.showToast('No ha sido posible actualizar los datos, por favor intente de nuevo.');
    });
  }

}
