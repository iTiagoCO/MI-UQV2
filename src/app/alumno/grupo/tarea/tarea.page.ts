import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from 'src/app/services/storageService.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage implements OnInit {
  tarea:any;
  entregada = false;
  userData:any;
  constructor(
    private storageService: StorageService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.storageService.getItem('tarea').subscribe((tarea:any)=> {
      this.tarea = tarea;
    });
    this.storageService.getItem('grupo').subscribe((data:any)=> {
      this.storageService.getItem('userData').subscribe((dataUser:any)=> {
        this.userData = dataUser;
        this.db.collection('alumnotareas', ref => ref.where('tarea', '==', this.tarea.id)
                                                    .where('alumno', '==', dataUser.uid))
                                                    .get().subscribe((data:any)=> {
                                                      data.forEach((doc:any)=> {
                                                        if(doc.data().tarea == this.tarea.id) {
                                                          this.tarea.entregada = doc.data().entregada;
                                                          this.entregada = doc.data().entregada;
                                                        } else {
                                                          this.tarea.entregada = false;
                                                        }
                                                      });
                                                    });
        
      });
    });
  }

  entregarTarea(event) {
    console.log(event.detail);
    //check if already exists con collection, if does not exists then add else update
    this.db.collection('alumnotareas', ref => ref.where('tarea', '==', this.tarea.id)
                                                .where('alumno', '==', this.userData.uid))
                                                .get().subscribe((data:any)=> {
                                                  // if exists update	
                                                  if(data.size > 0) {
                                                    data.forEach((doc:any)=> {
                                                      console.log(doc.data());
                                                      this.db.collection('alumnotareas').doc(doc.id).update({
                                                        entregada: event.detail.checked
                                                      });
                                                      this.tarea.entregada = event.detail.checked;
                                                    });
                                                  } else {
                                                    // if not exists add
                                                    this.db.collection('alumnotareas').add({
                                                      alumno: this.userData.uid,
                                                      tarea: this.tarea.id,
                                                      entregada: event.detail.checked
                                                    });
                                                    this.tarea.entregada = event.detail.checked;
                                                  }
                                                });
  }
}
