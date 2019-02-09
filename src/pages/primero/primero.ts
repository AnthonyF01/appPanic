import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Geocoder, 
  GeocoderRequest, 
  GeocoderResult,
 } from '@ionic-native/google-maps';
import { 
  NativeGeocoder, 
  NativeGeocoderReverseResult, 
  NativeGeocoderForwardResult, 
  NativeGeocoderOptions 
} from '@ionic-native/native-geocoder';

import { NotificationProvider } from '../../providers/notification/notification';

declare var google;

/**
 * Generated class for the PrimeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-primero',
  templateUrl: 'primero.html',
})
export class PrimeroPage {

  value: string;
  lat: any;
  lng: any;
  acc: any;
  nombre: any;
  telefono: any;
  idnot: any;
  add: any;
  @ViewChild('map') mapElement: ElementRef;
  // map: any;
  map: GoogleMap;
  myPosition: any = {};
  markers: any[] = [
    {
      position:{
        latitude: -18.0566745,
        longitude: -70.2387878,
      },
      title:'Point 1'
    },
    {
      position:{
        latitude: -18.0506884,
        longitude: -70.2397749,
      },
      title:'Point 2'
    },
    {
      position:{
        latitude: -18.051398,
        longitude: -70.2407904,
      },
      title:'Point 3'
    },
    {
      position:{
        latitude: -18.0578887,
        longitude: -70.223664,
      },
      title:'Point 4'
    },
  ];

  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private nativePageTransitions: NativePageTransitions,
    private geolocation: Geolocation, 
    private googleMaps: GoogleMaps, 
    private nativeGeocoder: NativeGeocoder,
    private geocoder: Geocoder,
    public alertCtrl: AlertController,
    private notificationService: NotificationProvider,
    private loadingCtrl: LoadingController,
  ) {
    this.myPosition = {
      latitude: parseFloat(navParams.get('lat')),
      longitude: parseFloat(navParams.get('lng'))
    }
    this.lat = parseFloat(navParams.get('lat'));
    this.lng = parseFloat(navParams.get('lng'));
    this.acc = parseFloat(navParams.get('acc'));
    this.nombre = navParams.get('nombre');
    this.telefono = navParams.get('telefono');
    this.idnot = navParams.get('idnot');

    // console.log("nombre y telefono: "+this.nombre+" - "+this.telefono);
  }

  /*slidePage() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 1000,
      slowdownfactor: -1,
      iosdelay: 50
     };
 
    this.nativePageTransitions.slide(options);
    this.navCtrl.setRoot('SegundoPage');
  }*/
 
  flipPage() {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 600
     };
 
    this.nativePageTransitions.flip(options);
    this.navCtrl.push('SegundoPage');
  }
 
  /*fadePage() {
    this.nativePageTransitions.fade(null);
    this.navCtrl.setRoot('SegundoPage');
  }
 
  curlPage() {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 600
     };
    this.nativePageTransitions.curl(options);
    this.navCtrl.setRoot('SegundoPage');
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrimeroPage');
    this.loadMap();
  }

  ngOnInit() {
    console.log('ngOnInit InicioPage');
    // this.getCurrentPosition();
    // this.getLocation();
  }

  // maps and position

  getCurrentPosition(){
    let options = {
      enableHighAccuracy:true,
      timeout: 5000,
      maximumAge: 3000
    };
    this.geolocation.getCurrentPosition(options)
    .then(position => {
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.lat = Number((position.coords.latitude).toFixed(5));
      this.lng = Number((position.coords.longitude).toFixed(5));
      this.acc = Number((position.coords.accuracy).toFixed(0))+'m';
      this.loadMap();
      this.reverseGeocode(position.coords.latitude, position.coords.longitude);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  loadMap(){
    console.log('myPosition: '+this.myPosition.latitude+" - "+this.myPosition.longitude);

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
  
    this.map = this.googleMaps.create(element);
  
    // create CameraPosition
    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 15,
      tilt: 30
    };
  
    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');
  
      // move the map's camera to position
      this.map.moveCamera(position);

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        // title: '<div><button ion-button small round class="bbb"><ion-icon name="arrow-dropleft-circle"></ion-icon></button><button style="float: right;" ion-button small round class="ccc"><ion-icon name="arrow-dropright-circle"></ion-icon></button></div><br>'+"<b>Latitud: </b>"+this.lat+"<br><b>Longitud:</b> "+this.lng+"<br><b>Nombre:</b> Maria Perez"+"<br><b>Telefono:</b> +51965986532"
        title: "Ubicación de la notificación.",
      };

      // nuestra ubicacion
      this.addMarker(markerOptions);

      // para el array de ubicaciones
      // this.markers.forEach(marker=>{
      //   this.addMarker(marker);
      // });

    });
  }

  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title
    };
    this.map.addMarker(markerOptions);
  }

  reverseGeocode(lat,lng){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    this.nativeGeocoder.reverseGeocode(lat, lng, options)
    .then((result: NativeGeocoderReverseResult[]) => {
      console.log(" Address: "+JSON.stringify(result[0]));
      this.add = JSON.stringify(result[0].thoroughfare);
    })
    .catch((error: any) => console.log(error));
  }

  checkNotification(checked) {
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();
    this.notificationService.checkNotification(checked,this.idnot)
      .then((response: any) => {
        this.loading.dismiss();
        console.log(response);
        if (response.status == 'success') {
          let alert = this.alertCtrl.create({ title: 'Info', message: response.info, buttons: ['Ok'] });
          alert.present();
        }else{
          let alert = this.alertCtrl.create({ title: 'Error', message: response.info, buttons: ['Ok'] });
          alert.present();
        }
      })
      .catch(err => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error al marcar la notificacion'+err, buttons: ['Ok'] });
        console.log("error: "+err);
        alert.present();
      });
  }

}
