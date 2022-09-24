import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-crear-tareas',
  templateUrl: './crear-tareas.page.html',
  styleUrls: ['./crear-tareas.page.scss'],
})
export class CrearTareasPage implements OnInit {
  dataQuery:any;
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController,
    private storageService: StorageService,
    private oneSignal: OneSignal
  ) { 
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      estatus: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.storageService.getItem('grupo').subscribe((data:any) => {
      this.dataQuery = data;
    });
  }

  save() {
    this.databaseService.create('grupos/'+this.dataQuery.grupo+'/tareas',this.form.value).then(() => {
      this.navController.back();
    });
  }
}
