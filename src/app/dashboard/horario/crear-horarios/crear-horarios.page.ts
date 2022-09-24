import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-crear-horarios',
  templateUrl: './crear-horarios.page.html',
  styleUrls: ['./crear-horarios.page.scss'],
})
export class CrearHorariosPage implements OnInit {

  public dataGrupo: Observable<any[]>;
  public arrDocentes: Observable<any[]>;
  public form: FormGroup;
  public itemData:any;
  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController,
    private db: AngularFirestore
  ) { 
    this.form = this.formBuilder.group({
      grupo: ['', Validators.required],
      docente: ['', Validators.required],
      asignatura: ['', Validators.required],
      asignatura_nombre: ['', Validators.required],
      dia: ['', Validators.required],
      dia_nombre: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
    })
  }

  ngOnInit() {
    // Data Grupo
    this.storageService.getItem('grupo').subscribe((res:any) => {
      this.db.doc(`grupos/${res}`).valueChanges().subscribe((data:any) => {
        // Data Asignatura
        this.db.doc(`asignaturas/${data.asignatura}`).valueChanges().subscribe((asignatura:any) => {
          this.form.patchValue({
            grupo: res,
            docente: data.docente,
            asignatura: data.asignatura,
            asignatura_nombre: asignatura.nombre,
            dia: data.dia,
            dia_nombre: data.dia_nombre,
          });
          console.log(this.form.value);
        });
      });
    });
  }

  setDayText(daySelect) {
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
    console.log(day);
    this.form.get('dia_nombre').setValue(day);
  }

  save() {
    this.databaseService.create('horarios', this.form.value).then(() => {
      this.navController.navigateBack('/dashboard/lista-horarios');
    });
  }
}
