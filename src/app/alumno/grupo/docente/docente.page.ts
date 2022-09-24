import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  public form: FormGroup;
  dataItem:any;
  userImage = './assets/default_user_picture.jpg';
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private storageService: StorageService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      materno: ['', Validators.required],
      paterno: ['', Validators.required]
    })
   }

  ngOnInit() {}

  ionViewWillEnter() {
    this.storageService.getItem('grupo').subscribe((data:any) => {
      this.databaseService.getById('grupos', data.grupo).then((grupo)=> {
        grupo.subscribe((grupo:any) => {
          let dataGrupo = grupo.data();
          // get data user by id
          this.databaseService.getById('users', dataGrupo.docente).then((user)=> {
            user.subscribe((user)=> {
              let userData:any = user.data();
              console.log(userData);
              if(userData.photoURL) { this.userImage = userData.photoURL; }
              this.form.controls['email'].setValue(userData.email??'');
              this.form.controls['nombre'].setValue(userData.nombre??'');
              this.form.controls['paterno'].setValue(userData.paterno);
              this.form.controls['materno'].patchValue(userData.materno);
            })
          });
        });
      })
    });
  }
}
