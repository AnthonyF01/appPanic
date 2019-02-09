import { Component } from '@angular/core';
import { Platform, AlertController, Events, ToastController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FCM, NotificationData } from '@ionic-native/fcm';

import { AndroidPermissions } from '@ionic-native/android-permissions';

import { HomePage } from '../pages/home/home';
import { PrimeroPage } from '../pages/primero/primero';
import { ListNotificationPage } from '../pages/list-notification/list-notification';

import { AuthProvider } from '../providers/auth/auth';
// import { DeviceTokenProvider } from '../providers/deviceToken/deviceToken';

import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';

import { AuthPage } from '../pages/authLoginR/auth';

// import { LoginPage } from '../pages/auth/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  rootPage:any = AuthPage;

  public onlineOffline: boolean = navigator.onLine;

  constructor(
    public homepage: HomePage,
    private events: Events,
    public toast:ToastController,
    private alertCtrl: AlertController,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public androidPermissions: AndroidPermissions, 
    private authService: AuthProvider,
    // private deviceService: DeviceTokenProvider,
    private fcm: FCM,
    public network: Network,
    public networkProvider: NetworkProvider,
    // public nav:NavController,
  ) {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
  
      // add permissions to app
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
          this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
          this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS,
          this.androidPermissions.PERMISSION.CAMERA, 
          this.androidPermissions.PERMISSION.CALL_PHONE, 
          this.androidPermissions.PERMISSION.GET_ACCOUNTS, 
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
        ]
      );
  
      // obtener token del dispositivo (el token es unico para el dispositivo)
      this.fcm.getToken().then( 
        (token:string) => {
          // podria registrarse el token en este espacio
          console.log('token del dispositivo: ' + token);
          let alert = this.alertCtrl.create({ title: 'Token', message: token, buttons: ['Ok'] });
          // alert.present();
  
          // se define un evento que guarda el token, al que cualquier pagina podra suscribirse
          // y obtener las variables que contenga accediento a los temas o nombres de evento pe. 'token'  
          // this.events.publish('token', token);
  
          // se usa mejor un provider que almacena el token en el storage
          this.authService.storeTokenDevice(token);
        }
      ).catch(
        error => {
          console.log(error);
        }
      );
  
      // verificar cambios en el token 
      this.fcm.onTokenRefresh().subscribe(
        (token:string) => {
          console.log('actualizacion de token del dispositivo: ' + token);
        }
      );
      
      this.fcm.onNotification().subscribe( 
        data => {
          // verificar si la aplicacion se encuentra en primer plano o segundo plano
          // https://www.youtube.com/watch?v=hi8IPLNq59o
          // https://stackoverflow.com/Questions/44797486/Open-Specific-Page-using-firebase-api
          if (data.wasTapped) {
            // segundo plano
            console.log('aplicacion en segundo plano: ' + JSON.stringify(data));
            // this.nav.setRoot(PrimeroPage);
            // this.rootPage(ListNotificationPage);
          }else {
            // primer plano
            console.log('aplicacion en primer plano: ' + JSON.stringify(data));
            let alert = this.alertCtrl.create({ title: 'Info', message: 'Nueva notificación recibida.', buttons: ['Ok'] });
            alert.present();
            // this.rootPage(ListNotificationPage);
          }
        },
        error => {
          console.log('error: ' + error);
        }
      );

      // check network status via angular global var

      // if (!navigator.onLine) {
      //   console.log("No esta conectado a internet: --"+navigator.onLine);
      // }else{
      //   console.log("Esta conectado a internet: --"+navigator.onLine);
      // }
  

      this.initializeApp();
    
    });

  }

  initializeApp(): void {

    // check network status (/providers/network/network.ts)

    this.networkProvider.initializeNetworkEvents();

    /*// Offline event
    this.events.subscribe('network:offline', () => {
      console.log('network:offline ==> ' + this.networkProvider.getNetworkStatus());
      alert('network:offline ==> '+this.networkProvider.getNetworkStatus());

      // console.log('network:offline ==> ' + this.networkProvider.getNetworkType());
      // alert('network:offline ==> '+this.networkProvider.getNetworkType());

      // alert('network:offline ==> '+this.network.type);
    });

    // Online event
    this.events.subscribe('network:online', () => {
      console.log('network:online ==> ' + this.networkProvider.getNetworkStatus());
      alert('network:online ==> '+this.networkProvider.getNetworkStatus());

      // console.log('network:online ==> ' + this.networkProvider.getNetworkType());
      // alert('network:online ==> '+this.networkProvider.getNetworkType());

      // alert('network:online ==> '+this.network.type);
    });*/

    
    this.networkProvider.getNetworkStatus().subscribe(data => {
      console.log('platform ready', data);
      // this.alertCtrl.create ({
      //   message: data + ' ' +  this.networkProvider.getNetworkType(),
      // }).present();
    });

  }

}

