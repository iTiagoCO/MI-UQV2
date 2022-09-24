import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  term:string = '';
  arrData : any;
  userData:any;
  dataGrupo: Observable<any>;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.storageService.getItem('grupo').subscribe((data:any) => {
      this.storageService.getItem('userData').subscribe((dataUser:any) => {
        this.dataGrupo = this.db.doc(`grupos/${data.grupo}`).valueChanges();
        // Get data Tareas del grupo
        this.arrDataObservable = this.db.collection('grupos/'+data.grupo+'/tareas', ref => ref.orderBy('nombre')).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          }
        )));
        this.arrDataObservable.subscribe((data:any) => {
          this.arrData = [];
          this.arrData = data.map((doc:any)=> {
            this.db.collection('alumnotareas', ref => ref.where('tarea', '==', doc.id).where('alumno', '==', dataUser.uid)).get().subscribe((dataT:any)=> {
              dataT.forEach((docT:any)=> {
                if(docT.data().tarea == doc.id) {
                  doc.entregada = docT.data().entregada;
                } else {
                  doc.entregada = false;
                }
              });
            });
            return doc;
          });
          console.log(this.arrData);
        });
      });
    });
  }

  verTarea(tarea) {
    this.storageService.setItem('tarea', tarea);
    this.navController.navigateForward('/alumno/grupo/tarea');
  }

}
