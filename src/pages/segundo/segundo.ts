import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

/**
 * Generated class for the SegundoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-segundo',
  templateUrl: 'segundo.html',
})
export class SegundoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativePageTransitions: NativePageTransitions) {
  }

  goBack() {
    if (this.navCtrl.canGoBack()) {
      let options: NativeTransitionOptions = {
        direction: 'down',
        duration: 500,
        slowdownfactor: -1,
        slidePixels: 20,
      };
 
      this.nativePageTransitions.slide(options);
      this.navCtrl.pop();
    } else {
      let options: NativeTransitionOptions = {
        duration: 700
      };
      this.nativePageTransitions.fade(options);
      this.navCtrl.setRoot('PrimeroPage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SegundoPage');
  }

}
