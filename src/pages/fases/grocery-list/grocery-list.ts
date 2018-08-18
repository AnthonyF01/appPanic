import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-grocery-list',
  templateUrl: 'grocery-list.html',
})
export class GroceryListPage {

  private currentNumber = 1;
  private width:string = '30%'; // progress bar

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  insert(num) {
    this.currentNumber = num;
  }

  decrement() {
    if ( this.currentNumber > 1 ) {
      this.currentNumber--;
    }
  }

  increment() {
    this.currentNumber++;
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Ingrese cantidad',
      // message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          id: 'cantidad',
          name: 'cantidad',
          type: 'number',
          min: '1',
          max: '1500',
          placeholder: '0'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroceryListPage');
  }

}
