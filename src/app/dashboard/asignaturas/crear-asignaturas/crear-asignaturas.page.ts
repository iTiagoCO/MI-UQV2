import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-crear-asignaturas',
  templateUrl: './crear-asignaturas.page.html',
  styleUrls: ['./crear-asignaturas.page.scss'],
})
export class CrearAsignaturasPage implements OnInit {
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController
  ) { 
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      clave: ['', Validators.required],
      creditos: ['', Validators.min(1)],
      estatus: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  save() {
    this.databaseService.create('asignaturas', this.form.value);
    this.navController.navigateBack('/dashboard/lista-asignaturas');
  }
}
