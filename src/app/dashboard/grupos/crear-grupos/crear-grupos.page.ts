import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-crear-grupos',
  templateUrl: './crear-grupos.page.html',
  styleUrls: ['./crear-grupos.page.scss'],
})
export class CrearGruposPage implements OnInit {
  public arrAsignaturas: Observable<any[]>;
  public arrDocentes: Observable<any>;
  public arrFacultades: Observable<any[]>;
  public form: FormGroup;
  public itemData:any;
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private navController: NavController,
    private db: AngularFirestore
  ) { 
    this.form = this.formBuilder.group({
      docente: ['', Validators.required],
      docente_nombre:['', Validators.required],
      facultad: ['', Validators.required],
      facultad_nombre: ['', Validators.required],
      asignatura: ['', Validators.required],
      asignatura_nombre:['', Validators.required],
      clave: ['', Validators.required],
      horario: ['', Validators.min(1)],
      estatus: ['', Validators.required],
    })
  }

  ngOnInit() {

    this.arrDocentes = this.db.collection('users', ref => ref.where('tipo','==','docente').orderBy('clave')).get().pipe(map(actions => {
        return actions.docs.map(a => {
          let data:any = a.data();
          const id = a.id;
          return { id, ...data };
        });
      }));
    
    this.arrDocentes.subscribe(e => console.log(e));
    
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
      this.arrAsignaturas.subscribe(e => console.log(e));
    });
    
  }
  setNombreDocente($event) {
    console.log($event.detail.value);
    this.db.doc('users/'+$event.detail.value).ref.get().then((doc:any) => {
      this.form.get('docente_nombre').setValue(doc.data().nombre);
    });
  }
  setNombreAsignatura($event) {
    console.log($event.detail.value);
    this.db.doc('asignaturas/'+$event.detail.value).ref.get().then((doc:any) => {
      console.log(doc.data());
      this.form.get('asignatura_nombre').setValue(doc.data().nombre);
    });
  }
  setNombreFacultad($event) {
    console.log($event.detail.value);
    this.db.doc('facultades/'+$event.detail.value).ref.get().then((doc:any) => {
      this.form.get('facultad_nombre').setValue(doc.data().nombre);
    });
  }
  save() {
    this.databaseService.create('grupos', this.form.value);
    this.navController.navigateBack('/dashboard/lista-grupos');
  }

}
