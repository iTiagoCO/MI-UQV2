import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storageService.service';
import * as moment from 'moment';
@Component({
  selector: 'app-lista-horarios',
  templateUrl: './lista-horarios.page.html',
  styleUrls: ['./lista-horarios.page.scss'],
})
export class ListaHorariosPage implements OnInit {
  term:string = '';
  dataGrupo:any;
  arrData : any;
  public arrDataObservable: Observable<any[]>;
  constructor(
    private navController: NavController,
    private db: AngularFirestore,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.storageService.getItem('grupo').subscribe((idGrupo)=> {
      if(idGrupo) {
        this.db.doc('grupos/'+idGrupo).ref.get().then((doc)=> {
          if(doc.exists) {
            this.dataGrupo = doc.data();
            this.arrDataObservable = this.db.collection('horarios', ref => ref.where('asignatura', '==', this.dataGrupo.asignatura)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data = a.payload.doc.data() as any;
                const inicio_decode = moment(data.inicio, ["h:mm A"]).format('hh:mm A');
                const fin_decode = moment(data.fin, ["h:mm A"]).format('hh:mm A');
                const id = a.payload.doc.id;
                return { id,inicio_decode, fin_decode, ...data };
              })));
          }
        });
      }
  });
}

  add() {
    this.navController.navigateForward('/dashboard/crear-horarios');
  }

  edit(horario) {
    this.storageService.setItem('horario', horario);
    this.navController.navigateForward('/dashboard/editar-horarios');
  }
}