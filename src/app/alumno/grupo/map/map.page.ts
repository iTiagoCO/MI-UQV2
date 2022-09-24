import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/app/services/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { google } from 'google-maps';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {
  @ViewChild('map',{static: false}) mapElement: ElementRef;
  public map: any;
  private latCurrent;
  private lngCurrent;
  private latDestino: any;
  private lngDestino: any;
  loadedMap = false;
  markersArray = [];
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  dataFacultad:any;
  constructor(
    private ngZone: NgZone,
    private platform: Platform,
    private utils: UtilsService,
    private storageService: StorageService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.platform.ready().then(() => {
      this.storageService.getItem('grupo').subscribe((data:any)=> {
        this.db.collection('grupos').doc(data.grupo).get().subscribe((data:any)=> {
          this.db.collection('facultades').doc(data.data().facultad).get().subscribe((data:any)=> {
            this.dataFacultad = data.data();
            this.latDestino = data.data().lat;
            this.lngDestino = data.data().lng;
            this.calculateAndDisplayRoute({
              source: {
                lat: this.latCurrent,
                lng: this.lngCurrent
              },
              destination: {
                lat: this.latDestino,
                lng: this.lngDestino
              }
            });
          });
        });
      });
      this.storageService.getItem('currentGPS').subscribe((gps:any)=> {
        if(gps) {
          this.latCurrent = gps.lat;
          this.lngCurrent = gps.lng;
          if(this.loadedMap == false){
            this.loadedMap = true;
            this.loadMapView({coords:{latitude:gps.lat,longitude:gps.lng}});
            this.latCurrent = gps.lat;
            this.lngCurrent = gps.lng;
            this.clearMarkers();
          } else {
            this.latCurrent = gps.lat;
            this.lngCurrent = gps.lng;
            this.clearMarkers();
            this.calculateAndDisplayRoute({
              source: {
                lat: this.latCurrent,
                lng: this.lngCurrent
              },
              destination: {
                lat: this.latDestino,
                lng: this.lngDestino
              }
            });
          }
        } else {
          this.utils.showToast('No ha sido posible procesar su ubicación, por favor intente nuevamente');
        }
      });
    });
  }
  loadMapView(resp) {
    const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    const mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.setCenter(latLng);
    this.directionsDisplay.setOptions({ suppressMarkers: true } );
    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute(data) {
    console.log(data);
    this.directionsService.route({
      origin: data.source,
      destination: data.destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        let marker = new google.maps.Marker({ position: data.source, map: this.map});
        this.markersArray.push(marker);
        marker = new google.maps.Marker({ position: data.destination, map: this.map});
        this.markersArray.push(marker);
      }
    });
  }

  addMarker(location) {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markersArray.push(marker);
  }

  setMapOnAll(map) {
    for (let i = 0; i < this.markersArray.length; i++) {
      this.markersArray[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }
}
