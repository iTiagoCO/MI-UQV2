import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonItem, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-editar-asignaturas',
  templateUrl: './editar-asignaturas.page.html',
  styleUrls: ['./editar-asignaturas.page.scss'],
})
export class EditarAsignaturasPage implements OnInit {
  public form: FormGroup;
  dataItem:any;
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController,
    private storageService: StorageService,
    private alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      clave: ['', Validators.required],
      creditos: ['', Validators.min(1)],
      estatus: ['', Validators.required],
    })
   }

  ngOnInit() {
    this.storageService.getItem('asignatura').subscribe((data:any) => {
      this.dataItem = data;
      this.form.controls['nombre'].setValue(data.nombre);
      this.form.controls['clave'].setValue(data.clave);
      this.form.controls['creditos'].setValue(data.creditos);
      this.form.controls['estatus'].patchValue(data.estatus);
    });
  }

  save() {
    this.databaseService.update('asignaturas', this.dataItem.id, this.form.value).then(() => {
      this.navController.navigateBack('/dashboard/lista-asignaturas');
    })
  }

  async remove() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Estás seguro de eliminar la asignatura?',
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
            this.databaseService.delete('asignaturas', this.dataItem.id).then(() => {
              this.navController.navigateBack('/dashboard/lista-asignaturas');
            })
          }
        }]
      });
      alert.present();
  }
}
