import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NoTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-no-tabs',
  templateUrl: 'no-tabs.html',
})
export class NoTabsPage {

  items: Array<{title:string, price:string, img:string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoTabsPage');
  }

  slides= [
    { title: 'Titulo de prueba 1', description: 'Descripcion del slide 1', img: 'assets/imgs/slide1.jpeg' },
    { title: 'Titulo de prueba 2', description: 'Descripcion del slide 2', img: 'assets/imgs/slide2.jpeg' },
    { title: 'Titulo de prueba 3', description: 'Descripcion del slide 3', img: 'assets/imgs/slide3.jpeg' },
    { title: 'Titulo de prueba 4', description: 'Descripcion del slide 4', img: 'assets/imgs/slide4.jpeg' },
    { title: 'Titulo de prueba 5', description: 'Descripcion del slide 5', img: 'assets/imgs/slide5.jpeg' },
  ];

}
