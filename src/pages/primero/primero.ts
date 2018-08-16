import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativePageTransitions: NativePageTransitions) {
  }

  slidePage() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 1000,
      slowdownfactor: -1,
      iosdelay: 50
     };
 
    this.nativePageTransitions.slide(options);
    this.navCtrl.setRoot('SegundoPage');
  }
 
  flipPage() {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 600
     };
 
    this.nativePageTransitions.flip(options);
    this.navCtrl.push('SegundoPage');
  }
 
  fadePage() {
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrimeroPage');
  }

}
