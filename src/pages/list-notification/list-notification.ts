import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { NotificationProvider } from '../../providers/notification/notification';

import { PrimeroPage } from '../primero/primero';

/**
 * Generated class for the ListNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-notification',
  templateUrl: 'list-notification.html',
})
export class ListNotificationPage {

  loading: any;

  flag:any = false;

  notifications: Array<{idnot:any ,lat:string, lng:string, acc:string, nombre:string, telefono:string, title:string, body:string, state:boolean}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private notificationService: NotificationProvider,) {
      this.loadNotification();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListNotificationPage');
  }

  loadNotification() {
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();
    console.log('load notifications');
    this.notificationService.getNotification()
      .then((response: any) => {
        this.notifications = [];
        if (response.notifications.length > 0) {
          // console.log(response.notifications[0].expediente);
          this.flag = true;
        }else {
          this.flag = false;
        }
        for (let index = 0; index < response.notifications.length; index++) {
          this.notifications.push({
            idnot:response.notifications[index].id,
            lat:response.notifications[index].lat,
            lng:response.notifications[index].lng,
            acc:response.notifications[index].acc,
            nombre:response.notifications[index].nombre,
            telefono:response.notifications[index].fono,
            title:response.notifications[index].title,
            body:response.notifications[index].body,
            state:response.notifications[index].state
          });
        }
        console.log(this.notifications);
        this.loading.dismiss();
      })
      .catch(err => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error al cargar las notificaciones<br>'+err, buttons: ['Ok'] });
        console.log("error: "+err);
        alert.present();
      });
  }

  showDetails(state:any,idnot:any,lat:string,lng:string,acc:string,nombre:string,telefono:string) {
    // console.log("nombre: "+nombre);
    if (state != 1) {
      this.navCtrl.push(PrimeroPage,{
        idnot:idnot,
        lat:lat,
        lng:lng,
        acc:acc,
        nombre:nombre,
        telefono:telefono,
      });
    }else{
      let alert = this.alertCtrl.create({ title: 'Info', message: 'Esta notificatión ya ha sido atendida.', buttons: ['Ok'] });
      alert.present();
    }
  }

  // recargar la pagina
  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
