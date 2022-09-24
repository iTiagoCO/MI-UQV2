import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-editar-grupos',
  templateUrl: './editar-grupos.page.html',
  styleUrls: ['./editar-grupos.page.scss'],
})
export class EditarGruposPage implements OnInit {
  public arrAsignaturas: Observable<any[]>;
  public arrDocentes: Observable<any[]>;
  public arrFacultades: Observable<any[]>;
  itemData:any;
  form: FormGroup;
  idGrupo:any;
  constructor(
    private storageService: StorageService,
    private db: AngularFirestore,
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController,
    private alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      docente: ['', Validators.required],
      facultad: ['', Validators.required],
      asignatura: ['', Validators.required],
      clave: ['', Validators.required],
      horario: ['', Validators.min(1)],
      estatus: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.arrDocentes = this.db.collection('users', ref=> ref.where('tipo','==','docente').orderBy('clave')).valueChanges();

    this.databaseService.getAll('facultades').then((data)=> {
      this.arrFacultades = data.pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }));
    });

    this.databaseService.getAll('asignaturas').then((data)=> {
      this.arrAsignaturas = data.pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }));
    });
    
    this.storageService.getItem('grupo').subscribe((idGrupo)=> {
      if(idGrupo) {
        this.idGrupo = idGrupo;
        this.db.doc('grupos/'+idGrupo).valueChanges().subscribe((data)=> {
          this.itemData = data;
          this.itemData.id = idGrupo;
          this.form.get('docente').setValue(this.itemData.docente);
          this.form.get('facultad').setValue(this.itemData.facultad);
          this.form.get('asignatura').setValue(this.itemData.asignatura);
          this.form.get('clave').setValue(this.itemData.clave);
          this.form.get('estatus').setValue(this.itemData.estatus);
        });
      }

    });
  }

  save() {
    this.databaseService.update('grupos', this.idGrupo,this.form.value);
    this.navController.navigateBack('/dashboard/lista-grupos');
  }

  async horario() {
    this.storageService.setItem('grupo', this.idGrupo);
    this.navController.navigateForward('/dashboard/lista-horarios');
  }

  async remove() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Estás seguro de eliminar el grupo '+this.itemData.clave+'?',
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
            this.databaseService.delete('grupos', this.idGrupo);
            this.navController.navigateBack('/dashboard/lista-grupos');
          }
        }]
      });
      alert.present();
  }
  async alumnos() {
    this.storageService.setItem('grupo', this.idGrupo);
    this.navController.navigateForward('/dashboard/lista-alumnos-grupos');
  }
}
