import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
import { Toast } from '@ionic-native/toast';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { NotificationProvider } from '../../providers/notification/notification';

import { AuthPage } from '../authLoginR/auth';

declare var google;

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  private response:boolean;

  loading: any;

  notification: Array<{idnot:any ,lat:string, lng:string, acc:string, nombre:string, telefono:string, title:string, body:string, state:boolean}>;

  lat: any;
  lng: any;
  acc: any;
  add: any;

  nav: Nav;

  isenabledBtn: boolean = true;

  checkAccess: any = false;

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

  infoWindows: any;

  items: Array<{title:string, price:string, img:string}>;
  items2: Array<{head:string, content:string, img:string}>;
  items3: Array<{head:string, price:string, content:string, img:string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private geolocation: Geolocation, 
    private googleMaps: GoogleMaps, 
    private nativeGeocoder: NativeGeocoder,
    private geocoder: Geocoder,
    private toast: Toast,
    public alertCtrl: AlertController,
    public http: Http,
    private loadingCtrl: LoadingController,
    private authService: AuthProvider,
    private userService: UserProvider,
    private notificationService: NotificationProvider,
  ) {

    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();

    this.items = [
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
    ];

    console.log(this.items);
    console.log(typeof this.items);

    this.items2 = [
      { head: 'Heading', content: 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.', img: 'assets/imgs/celular8.jpg' },
      { head: 'Heading', content: 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.', img: 'assets/imgs/celular8.jpg' },
      { head: 'Heading', content: 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.', img: 'assets/imgs/celular8.jpg' },
      { head: 'Heading', content: 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.', img: 'assets/imgs/celular8.jpg' },
    ];

    this.items3 = [
      { head: 'Android', price: '$ 980.00', content: 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.', img: 'assets/imgs/celular8.jpg' },
      { head: 'Android', price: '$ 980.00', content: 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.', img: 'assets/imgs/celular8.jpg' },
      { head: 'Android', price: '$ 980.00', content: 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.', img: 'assets/imgs/celular8.jpg' },
      { head: 'Android', price: '$ 980.00', content: 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.', img: 'assets/imgs/celular8.jpg' },
      { head: 'Android', price: '$ 980.00', content: 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.', img: 'assets/imgs/celular8.jpg' },
      { head: 'Android', price: '$ 980.00', content: 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.', img: 'assets/imgs/celular8.jpg' },
    ];

    this.infoWindows = [];

    // check user permission
    // this.userService.checkAccess()
    //   .then((response: any) => {
    //     if (response) {
    //       this.checkAccess = true;
    //     }else{
    //       this.checkAccess = false;
    //     }        
    //     this.loading.dismiss();
    //   })
    //   .catch(err => {
    //     console.log("Error al verificar los permisos: "+err);
    //   });

    this.checkAccessType()
      .then( (response) => {
        this.checkAccess = response;
        console.log("checkAccessType-flag: "+this.checkAccess);
        // se carga para cualquier usuario
        this.getCurrentPosition(this.checkAccess);
        if (this.checkAccess) { // si es un administrador
          this.notificationService.getNotification()
            .then((response: any) => {
              console.log("get first notification");
              this.notification = [];
              // for (let index = 0; index < response.notifications.length; index++) {
                this.notification.push({
                  idnot:response.notifications[0].id,
                  lat:response.notifications[0].lat,
                  lng:response.notifications[0].lng,
                  acc:response.notifications[0].acc,
                  nombre:response.notifications[0].nombre,
                  telefono:response.notifications[0].fono,
                  title:response.notifications[0].title,
                  body:response.notifications[0].body,
                  state:response.notifications[0].state
                });
              // }
              this.loadMap(this.notification[0].lat,this.notification[0].lng);
              console.log(this.notification);
              this.loading.dismiss();
            })
            .catch(err => {
              this.loading.dismiss();
              let alert = this.alertCtrl.create({ title: 'Error', message: 'Error al cargar la notificacion<br>'+err, buttons: ['Ok'] });
              console.log("error: "+err);
              alert.present();
            });
        }
      })
      .catch(error => {
        console.log(error);
      });

  } 

  slides= [
    { title: 'Titulo de prueba 1', description: 'Descripcion del slide 1', img: 'assets/imgs/slide1.jpeg' },
    { title: 'Titulo de prueba 2', description: 'Descripcion del slide 2', img: 'assets/imgs/slide2.jpeg' },
    { title: 'Titulo de prueba 3', description: 'Descripcion del slide 3', img: 'assets/imgs/slide3.jpeg' },
    { title: 'Titulo de prueba 4', description: 'Descripcion del slide 4', img: 'assets/imgs/slide4.jpeg' },
    { title: 'Titulo de prueba 5', description: 'Descripcion del slide 5', img: 'assets/imgs/slide5.jpeg' },
  ];

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
    // this.getLocation();
    this.loading.present();
    // verifica si el usuario esta autenticado
    this.ionViewCanEnter().then(response => {
      this.loading.dismiss();
      this.response = response;
      if (this.response) {
        console.log("isAuthenticated-ini: "+this.response);
      }else{
        // usuario no autenticado
        // this.authService.removeCredentials();
        this.nav.setRoot(AuthPage);
      }
    });
  }

  async checkAccessType (){
    let access = await this.authService.getAccessType();
    return access;
  }

  async ionViewCanEnter () {
    let isAuthenticated = await this.authService.checkIsAuthenticated();
    return isAuthenticated;
  }

  // asincrono
  ionViewWillEnter() {
    /*if (this.checkAccess) { // solo administradores
      this.notificationService.getNotification()
        .then((response: any) => {
          console.log("get first notification");
          this.notification = [];
          // for (let index = 0; index < response.notifications.length; index++) {
            this.notification.push({
              idnot:response.notifications[0].id,
              lat:response.notifications[0].lat,
              lng:response.notifications[0].lng,
              acc:response.notifications[0].acc,
              nombre:response.notifications[0].nombre,
              telefono:response.notifications[0].fono,
              title:response.notifications[0].title,
              body:response.notifications[0].body,
              state:response.notifications[0].state
            });
          // }
          console.log(this.notification);
          this.loading.dismiss();
        })
        .catch(err => {
          this.loading.dismiss();
          let alert = this.alertCtrl.create({ title: 'Error', message: 'Error al cargar la notificacion<br>'+err, buttons: ['Ok'] });
          console.log("error: "+err);
          alert.present();
        });
    }*/
  }

  ngOnInit() {
    console.log('ngOnInit InicioPage');
    // this.getCurrentPosition();
    // this.getLocation();
  }

  getCurrentPosition(access:any){
    let options = {
      enableHighAccuracy:true,
      timeout: 5000,
      maximumAge: 3000
    };
    this.geolocation.getCurrentPosition(options)
    .then(position => {
      console.log("get position");
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.lat = Number((position.coords.latitude).toFixed(5));
      this.lng = Number((position.coords.longitude).toFixed(5));
      this.acc = Number((position.coords.accuracy).toFixed(0))+'m';
      // if (access) {
      // }
      // this.reverseGeocode(position.coords.latitude, position.coords.longitude);
    })
    .catch(error=>{
      console.log(error);  
    })
  }

  loadMap(lat:any, lng:any){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
  
    this.map = this.googleMaps.create(element);
    
    // setting lat & long
    let location: any = {};
    location = {
      latitude: Number(lat),
      longitude: Number(lng)
    }

    // create CameraPosition
    let position: CameraPosition<LatLng> = {
      // target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      target: new LatLng(location.latitude, location.longitude),
      zoom: 15,
      tilt: 30
    };
  
    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');
  
      // move the map's camera to position
      this.map.moveCamera(position);

      let markerOptions: MarkerOptions = {
        // position: this.myPosition,
        position: location,
        title: '<div><button ion-button small round class="bbb"><ion-icon name="arrow-dropleft-circle"></ion-icon></button><button style="float: right;" ion-button small round class="ccc"><ion-icon name="arrow-dropright-circle"></ion-icon></button></div><br>'+"<b>Latitud: </b>"+this.lat+"<br><b>Longitud:</b> "+this.lng+"<br><b>Nombre:</b> Maria Perez"+"<br><b>Telefono:</b> +51965986532"
      };

      // la ubicacion solicitada como parametro en esta funcions
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
    /*this.map.addMarker(markerOptions).then(marker =>{
      this.doGeocode(marker);
    })*/
  }

  /*doGeocode(marker){
    let request: GeocoderRequest = {
      position: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
    };
    this.geocoder.geocode(request).then((results: GeocoderResult[]) => {
      let address = [
        (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
        results[0].locality
      ].join(", ");
      console.log("data_: ", address);
      marker.setTitle(address);
      marker.showInfoWindow();
    });
  }*/

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

  // show details
  show(){
    let alert = this.alertCtrl.create({
      title: 'Ubicación actual',
      subTitle: '<div class="mainContainer"><div class="container"><h3 class="title">LATITUD</h3><h3 class="content">'+this.lat+'</h3></div><div class="container"><h3 class="title">LONGITUD</h3><h3 class="content">'+this.lng+'</h3></div><div class="container"><h3 class="title">PRECISION</h3><h3 class="content">'+this.acc+'</h3></div></div>',
      buttons: ['OK']
    });
    alert.present();
  }

  // getLocation(){

    //   // primera forma de obtener posicion
    //     let options = {
    //       enableHighAccuracy:true,
    //       timeout: 5000,
    //       maximumAge: 3000
    //     };
        
    //     // para google maps
    //     let mapOptions = {
    //       zoom: 13,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP,
    //       mapTypeControl: false,
    //       streetViewControl: false,
    //       fullscreenControl: false
    //     }
    //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //     let marker = new google.maps.Marker({
    //       map: this.map,
    //       animation: google.maps.Animation.DROP,
    //       position: this.map.getCenter()
    //     });
    //     let content = "<h4>Information!</h4>";
    //     let infoWindow = new google.maps.InfoWindow({
    //       content: content
    //     });
    //     this.map.
    
    //     google.maps.event.addListener(marker, 'click', () => {
    //       infoWindow.open(this.map, marker);
    //     });

    //     this.geolocation.getCurrentPosition(options).then(pos => {
    //       let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    //       this.map.setCenter(latLng);
    //       this.lat = pos.coords.latitude;
    //       this.lng = pos.coords.longitude;
    //       this.acc = pos.coords.accuracy;
    //       this.map.setZoom(16);
          
    //     }).catch((error) => {
    //       console.log('Error getting location', error);
    //     });

    //     /*this.geolocation.getCurrentPosition(options).then((res) => {
    //       let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
    //       console.log(location);
    //       this.lat = res.coords.latitude;
    //       this.lng = res.coords.longitude;
    //       alert('lat '+this.lat+' lang '+this.lng);
    //     }).catch((error) => {
    //       console.log('Error getting location', error);
    //     });*/

    //   // segunda forma de obtener posicion
    //     /*let watch = this.geolocation.watchPosition();
    //     watch.subscribe((data) => {
    //       // data can be a set of coordinates, or an error (if an error occurred).
    //       // data.coords.latitude
    //       // data.coords.longitude
    //       let location='lat '+data.coords.latitude+' lang '+data.coords.longitude;
    //       console.log(location);
    //       this.lat = data.coords.latitude;
    //       this.lng = data.coords.longitude;
    //       alert('lat '+this.lat+' lang '+this.lng);
    //     });*/
  // }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(57.8127004, 14.2106225);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  getMarkers() {
    this.http.get('assets/data/markers.json').map((res) => res.json()).subscribe(data => {
      this.addMarkersToMap(data);
    });
  }

  // Reemplazado abajo
  /*addMarkersToMap(markers) {
    for(let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var dogwalkMarker = new google.maps.Marker({position: position, title: marker.title});
      dogwalkMarker.setMap(this.map);
    }
  }*/

  // Infowindow

  addInfoWindowToMarker(marker, markers) {
    // var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1></div>';
    var infoWindowContent = '<div><button ion-button small round class="bbb"><ion-icon name="arrow-dropleft-circle"></ion-icon></button><button style="float: right;" ion-button small round class="ccc"><ion-icon name="arrow-dropright-circle"></ion-icon></button></div><br>'+"<b>Latitud: </b>"+markers.latitude+"<br><b>Longitud:</b> "+markers.longitude+"<br><b>Nombre:</b> Maria Perez"+"<br><b>Telefono:</b> +51965986532";
    console.log("position: ",marker.position);
    debugger
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  addMarkersToMap(markers) {
    for(let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
        // icon: 'assets/images/marker.png'
      });
      dogwalkMarker.setMap(this.map);
      this.addInfoWindowToMarker(dogwalkMarker, marker);
    }
  }

  send(lat:any, lng: any, acc: any){
    
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();

    if ( (typeof lat !== 'undefined' && (lat)) && (typeof lng !== 'undefined' && (lng)) && (typeof acc !== 'undefined' && (acc)) ) {
      this.isenabledBtn = false;
      console.log("Send alert message to controller");
      // this.getLocation();
  
      this.notificationService.sendNotificationInfo(lat, lng, acc)
      .then((response: any) => {
        this.isenabledBtn = true;
        this.loading.dismiss();
        // this.user = response;
        console.log(response.info);
        if (response.status == 'success') {
          let alert = this.alertCtrl.create({ title: 'Info', message: response.info, buttons: ['Ok'] });
          alert.present();
        }else{
          let alert = this.alertCtrl.create({ title: 'Error', message: response.info, buttons: ['Ok'] });
          alert.present();
        }
      })
      .catch(err => {
        this.isenabledBtn = true;
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error al enviar la noticiación'+err, buttons: ['Ok'] });
        alert.present();
      });
    }else{
      this.loading.dismiss();
      let alert = this.alertCtrl.create({ title: 'Info', message: 'Las coordernadas de su ubicación no están definidas. Por favor recargue esta página.', buttons: ['Ok'] });
      alert.present();
    }

  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  showInfo() {
    let alert = this.alertCtrl.create({ title: 'Información de ayuda', message: 'Pulse sobre el botón rojo para enviar un mensaje de alerta.<br><br>Para permitir una localización más precisa, asegúrese de que el GPS esté activado y que haya configurado el modo de ubicación del dispositivo a "Alta precision".', buttons: ['Ok'] });
    alert.present();
  }

}
