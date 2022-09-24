import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { UtilsService } from 'src/app/shared/utils.service';
declare var google: any;
@Component({
  selector: 'app-crear-facultades',
  templateUrl: './crear-facultades.page.html',
  styleUrls: ['./crear-facultades.page.scss'],
})
export class CrearFacultadesPage implements OnInit {
  @ViewChild('map',{static: false}) mapElement: ElementRef;
  public map: any;
  private lat;
  private lng;
  term: string = '';
  form: FormGroup;
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResults = new Array<any>();
  marker:any = [] ;
  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private platform: Platform,
    private utils: UtilsService,
    private database: DatabaseService,
    private navController: NavController
  ) { 
    this.form = this.formBuilder.group({
      'nombre':['', Validators.required],
      'direccion':['', Validators.required],
      'lat':['', Validators.required],
      'lng':['', Validators.required],
      'estatus':['', Validators.required],
    });
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      let gps = JSON.parse(localStorage.getItem('currentGPS'));
      if(gps) {
        this.form.get('direccion').setValue(gps.search);
        this.form.get('lat').setValue(gps.lat);
        this.form.get('lng').setValue(gps.lng);
        this.loadMapView({coords:{latitude:gps.lat,longitude:gps.lng}});
      } else {
        this.utils.showAlert('No ha sido posible procesar su ubicación, por favor intente nuevamente');
      }
    });
  }

  searchChange() {
    if (!this.term) {return; }
    this.googleAutocomplete.getPlacePredictions({ input: this.term }, predictions => {
      this.ngZone.run(() => {
        this.searchResults = predictions;
      });
    });
  }


  loadMapView(resp) {
    const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.marker[0] = new google.maps.Marker({
          position: latLng,
          map: this.map,
          draggable:true
      });
      google.maps.event.addListener(this.marker[0], 'dragend', (evt) => {
        this.lat = evt.latLng.lat();
        this.lng = evt.latLng.lng();
        this.form.get('lat').setValue(this.lat);
        this.form.get('lng').setValue(this.lng);
        this.coordinatesToAddress(this.lat,this.lng);
      });
  }

  async setAddress(location: any) {
    console.log(location);
    let geocoder = new google.maps.Geocoder();
    try {
      geocoder.geocode({ 'address': location.description }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.ngZone.run(async () => {
            this.term = location.description;
            this.form.get('direccion').setValue(location.description);
            this.lat = results[0].geometry.location.lat();
            this.lng = results[0].geometry.location.lng();
            const latLng = new google.maps.LatLng(this.lat, this.lng);
            // remove previus marker
            if (this.marker[0]) {
              this.marker[0].setMap(null);
            }
            this.marker[0] = new google.maps.Marker({
                position: latLng,
                map: this.map,
                draggable:true
            });
            google.maps.event.addListener(this.marker[0], 'dragend', (evt) => {
              this.lat = evt.latLng.lat();
              this.lng = evt.latLng.lng();
              this.form.get('lat').setValue(this.lat);
              this.form.get('lng').setValue(this.lng);
              this.coordinatesToAddress(this.lat,this.lng);
            });
            this.map.setCenter(latLng);
            this.searchResults = [];
          });
        } else {
          this.utils.showAlert('No ha sido posible obtener ubicación');
        }
      });
    }catch(err){
      this.utils.showAlert('No ha sido posible obtener ubicación');
    }
  }

  async coordinatesToAddress(lat,long) {
    // return address from cordinates
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat, long);
    geocoder.geocode({ 'latLng': latlng }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.ngZone.run(() => {
            this.form.get('direccion').setValue(results[0].formatted_address);
            this.map.setCenter(latlng);
          });
        }
      }
    });
  }

  async save() {
    this.database.create('facultades',this.form.value).then(async (res) => {
      if(res) {
        this.utils.showAlert('Facultad creada correctamente');
        this.form.reset();
        this.navController.navigateRoot('/dashboard/lista-facultades');
      } else {
        this.utils.showAlert('No ha sido posible crear la facultad');
      }
    });
  }
}
