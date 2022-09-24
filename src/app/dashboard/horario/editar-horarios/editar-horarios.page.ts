import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-editar-horarios',
  templateUrl: './editar-horarios.page.html',
  styleUrls: ['./editar-horarios.page.scss'],
})
export class EditarHorariosPage implements OnInit {
  dataItem:any;
  public arrAsignaturas: Observable<any[]>;
  public arrDocentes: Observable<any[]>;
  public form: FormGroup;
  public itemData:any;
  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController
  ) { 
    this.form = this.formBuilder.group({
      grupo: ['', Validators.required],
      asignatura: ['', Validators.required],
      asignatura_nombre: ['', Validators.required],
      dia: ['', Validators.required],
      dia_nombre: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.storageService.getItem('horario').subscribe((item:any) => {
      this.itemData = item;
      this.form.get('grupo').setValue(item.grupo);
      this.form.get('asignatura').setValue(item.asignatura);
      this.form.get('asignatura_nombre').setValue(item.asignatura_nombre);
      this.form.get('dia').setValue(item.dia);
      this.form.get('dia_nombre').setValue(item.dia_nombre);
      this.form.get('inicio').setValue(item.inicio);
      this.form.get('fin').setValue(item.fin);
      console.log(this.form.value);
    });
  }

  setDayText(daySelect) { console.log(daySelect);
    let day = "";
    switch (parseInt(daySelect.detail.value)) {
      case 1:
        day = 'Lunes';
        break;
      case 2:
        day = 'Martes';
        break;
      case 3:
        day = 'Miercoles';
        break;
      case 4:
        day = 'Jueves';
        break;
      case 5:
        day = 'Viernes';
        break;
      case 6:
        day = 'Sabado';
        break;
      case 7:
        day = 'Domingo';
        break;
    }
    this.form.get('dia_nombre').setValue(day);
  }

  save() {
    this.databaseService.update('horarios',this.itemData.id, this.form.value).then(() => {
      this.navController.navigateBack('/dashboard/lista-horarios');
    });
  }

  delete() {
    this.databaseService.delete('horarios',this.itemData.id).then(() => {
      this.navController.navigateBack('/dashboard/lista-horarios');
    });
  }
}
