import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-editar-tareas',
  templateUrl: './editar-tareas.page.html',
  styleUrls: ['./editar-tareas.page.scss'],
})
export class EditarTareasPage implements OnInit {
  public form: FormGroup;
  dataItem:any;
  dataQuery:any;
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController,
    private storageService: StorageService,
    private alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      estatus: ['', Validators.required],
    })
   }

  ngOnInit() {
    this.storageService.getItem('grupo').subscribe(data => {
      this.dataQuery = data;
    });

    this.storageService.getItem('tarea').subscribe((data:any) => {
      this.dataItem = data;
      this.form.controls['nombre'].setValue(data.nombre);
      this.form.controls['fecha'].setValue(data.fecha);
      this.form.controls['estatus'].patchValue(data.estatus);
    });
  }

  save() {
    this.databaseService.update('grupos/'+this.dataQuery.grupo+'/tareas', this.dataItem.id, this.form.value).then(() => {
      this.navController.navigateBack('/docente/tareas');
    })
  }

  async remove() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Estás seguro de eliminar la tarea?',
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
            this.databaseService.delete('grupos/'+this.dataQuery.grupo+'/tareas', this.dataItem.id).then(() => {
              this.navController.navigateBack('/docente/tareas');
            })
          }
        }]
      });
      alert.present();
  }
}
