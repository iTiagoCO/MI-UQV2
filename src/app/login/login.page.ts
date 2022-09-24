import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { UtilsService } from '../shared/utils.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form: FormGroup;
  loading: any;
  constructor(
    private authSvc: AuthService, 
    private navController: NavController,
    private frmBuilder: FormBuilder,
    private menuController: MenuController,
    private loadingController: LoadingController,
    private utils: UtilsService
    ) {
      this.form = this.frmBuilder.group({
        email: [environment.auth.email, Validators.required],
        password: [environment.auth.password, Validators.required]
      });
    }
    ngInit() {
      this.menuController.enable(false);
    }

  async onLogin() {
      let loading = await this.loadingController.create({
        message:'Validando credenciales...',
        mode:'ios'
      });
      loading.present();
      this.authSvc.login(this.form.get('email').value, this.form.get('password').value).then((res)=> {
        let user = res;
        if (user) {
          this.redirectUser(user.emailVerified);
        }
      })
      .catch(()=> {
        this.utils.showAlert('No se pudo iniciar sesión, Verifica que tus credenciales sean correctas');
      })
      .finally(()=> {
        loading.dismiss();
      });
  }

  async loginGoogle() {
      console.log('Login Google');
      const user = await this.authSvc.loginWithGoogle();
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.menuController.enable(true);
    } else {
      this.menuController.enable(false);
      this.navController.navigateRoot('verify-email');
    }
  }

  register() {
    this.navController.navigateRoot('register');
  }
}