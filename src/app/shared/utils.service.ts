import { Injectable, NgZone } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { StorageService } from '../services/storageService.service';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  langString:any;
  public moment = moment;
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private oneSignal: OneSignal,
    private localStorageService: StorageService,
    public ngZone: NgZone,
  ) {
    this.localStorageService.getItem('langString').subscribe((langString:any)=> {
      this.langString = langString;
    });
  }


  async showToast(message,duration = 2000){
    const toast = await  this.toastCtrl.create({
      message: message,
      duration: duration,
      mode:'ios'
    });
    toast.present();
  }

  async showAlert(message){
    const alert = await  this.alertCtrl.create({
      message: message,
      mode:'ios',
      buttons: [
        {
          text: 'Aceptar',
        }
      ]
    });
    await alert.present();
  }

  setLocalStorage(alias,value){
    localStorage.setItem(alias,value);
  }

  getLocalStorage(alias):Promise<any> {
    var promise = new Promise((resolve, reject)=>{
      var value = localStorage.getItem(alias);
      if(value){
        resolve(value);
      }else{
        reject(false);
      }
    });
    return promise;
  }

  

  enableNotifications(data:any)
  {
        this.oneSignal.startInit(environment.uidOneSignal, environment.firebase.messagingSenderId);

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
         // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });
        this.oneSignal.sendTags({
          type: 1, // Client
          user_id: data.id,
          state_id: data.state_id,
          city_id: data.city_id
        });
        this.oneSignal.endInit();
  }

  disableNotifications()
  {
    this.localStorageService.getItem('dataProfile').subscribe((data:any) => {
      this.oneSignal.startInit(environment.uidOneSignal, environment.firebase.messagingSenderId);
      this.oneSignal.setSubscription(false);
    })
  }

  takePhotoFromCamera(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const camera = new Camera;
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 512,
        targetWidth: 512,
        correctOrientation: true,
        destinationType: camera.DestinationType.DATA_URL,
        encodingType: camera.EncodingType.JPEG,
        mediaType: camera.MediaType.PICTURE
      }
      camera.getPicture(options).then((image) => {
        resolve('data:image/jpeg;base64,' + image)
      },(err) => {
        reject(err);
      })
    });
    return promise;
   }

  takePhotoFromGallery(): Promise<any> {
      const promise = new Promise((resolve, reject) => {
        const camera = new Camera;
        const options: CameraOptions = {
          quality: 100,
          targetHeight: 512,
          targetWidth: 512,
          correctOrientation: true,
          encodingType: camera.EncodingType.JPEG,
          destinationType: camera.DestinationType.DATA_URL,
          sourceType: camera.PictureSourceType.PHOTOLIBRARY,
          saveToPhotoAlbum: false
        }
        camera.getPicture(options).then((image) => {
          resolve('data:image/jpeg;base64,' + image);
        },(err) => {
          reject(err);
        })
    });
    return promise;
  }
}