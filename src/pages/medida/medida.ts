import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailmedidaPage } from '../detailmedida/detailmedida';

/**
 * Generated class for the MedidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medida',
  templateUrl: 'medida.html',
})
export class MedidaPage {

  items: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.items = navParams.get('items');
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedidaPage');
  }

  showDetails(search:any) {
    this.navCtrl.push(DetailmedidaPage,{
      item:search
    });
  }

}
