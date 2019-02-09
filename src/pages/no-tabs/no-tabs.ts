import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { DenunciaProvider } from '../../providers/denuncia/denuncia';

import { DetailsPage } from '../details/details';

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

  loading: any;

  flag:any = false;

  total: any = 0;

  expedientes: Array<{expediente:string, calificacion:string}>;

  public search: string;

  items: Array<{title:string, price:string, img:string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private denunciaService: DenunciaProvider,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,) {

    this.items = [
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
      { title: 'Android', price: 'The most popular', img: 'assets/imgs/celular8.jpg' },
    ];

    // this.loading = this.loadingCtrl.create({content: 'Please wait ...'});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoTabsPage');
  }
  
  findExpediente (search:string) {
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();
    console.log('finding expediente');
    this.denunciaService.findExpediente(search)
    .then((response: any) => {
      this.expedientes = [];
      this.total = response.denuncia.length;
      if (response.denuncia.length > 0) {
        console.log(response.denuncia[0].expediente);
        this.flag = true;
      }else {
        this.flag = false;
      }
      for (let index = 0; index < response.denuncia.length; index++) {
        this.expedientes.push({expediente: response.denuncia[index].expediente,calificacion: response.denuncia[index].calificacion});        
      }
      console.log(this.expedientes);
      this.loading.dismiss();
      // let alert = this.alertCtrl.create({ title: 'Info', message: response.denuncia, buttons: ['Ok'] });
      // alert.present();
    })
    .catch(err => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({ title: 'Error', message: 'Error al buscar informacion de la denuncia', buttons: ['Ok'] });
      console.log("error: "+err);
      alert.present();
    });
  }

  showDetails(search:string) {
    this.navCtrl.push(DetailsPage,{
      item:search
    });
  }

  reset() {
    this.search = '';
  }

  showPwd() {
    console.log("show pwd");
  }

}
