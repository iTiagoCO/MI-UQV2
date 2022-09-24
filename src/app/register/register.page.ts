import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  constructor(
    private authSvc: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        email: [environment.auth.email, Validators.required],
        password: [environment.auth.password, Validators.required]
      });
    }

  ngOnInit() {}
  
  async onRegister() {
    try {
      const user = await this.authSvc.register(this.form.get('email').value, this.form.get('password').value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
