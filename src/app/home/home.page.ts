import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private navController: NavController) {

  }
  
  ngInit() {}

  ionViewWillEnter() {
    setTimeout(() => {
      this.navController.navigateRoot('/login');
    }, 2000);
  }
}