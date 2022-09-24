import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storageService.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  dataGrupo:any;
  arrMessagesCollection: AngularFirestoreCollection<any>;
  messagesObserver: Observable<any[]>;
  arrMessages:any = [];
  dataQuery: any;
  formMessages: FormGroup;
  userData:any;
  constructor(
    private db: AngularFirestore,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private navController: NavController
  ) {
    // Form message
    this.formMessages = this.formBuilder.group({
      'messageInput': ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.storageService.getItem('userData').subscribe(data => {
      this.userData = data;
    });
    this.storageService.getItem('grupo').subscribe((order: any) => {
      this.dataQuery = order;
      this.arrMessagesCollection = this.db.collection<any>('grupos/'+this.dataQuery.grupo+'/chat',
       ref =>  ref.orderBy('created', 'asc'));
      this.messagesObserver = this.arrMessagesCollection.valueChanges();
      this.messagesObserver.subscribe((res)=> {
        this.arrMessages = res.map((message:any)=> {
          return message;
        });
      });
    });
  }

  sendMessage(message) {
    const sendMessage: any = {
      text: message.messageInput,
      sender: 'docente',
      nombre: this.userData.nombre + ' ' +this.userData.paterno+' '+((this.userData.materno)+'').charAt(0),
      photoURL: this.userData.photoURL,
      created: new Date().getTime()
    };
    const messages = this.db.firestore.collection('grupos/'+this.dataQuery.grupo+'/chat');
    messages.add(sendMessage);
  }

  alumnos() {
    this.navController.navigateForward('docente/grupo/alumnos');
  }
}
