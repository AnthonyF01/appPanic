import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { DenunciaProvider } from '../../providers/denuncia/denuncia';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  value: string;
  loading: any;

  oficio:any;
  expediente:any;
  institucion:any;
  instancia:any;
  fdenuncia:any;
  fformalizacion:any;
  calificacion:any;
  faudiencia:any;
  remitido:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private denunciaService: DenunciaProvider,
    public alertCtrl: AlertController,
  ) {
    this.value = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.showDetails(this.value);
  }

  showDetails (search:string) {
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();
    console.log('finding expediente');
    this.denunciaService.detailsExpediente(search)
    .then((response: any) => {
      this.oficio = (response.denuncia.oficio) ? response.denuncia.oficio : '-';
      this.expediente = (response.denuncia.expediente) ? response.denuncia.expediente : '-';
      this.institucion = (response.denuncia.institucion) ? response.denuncia.institucion : '-';
      this.instancia = (response.denuncia.instancia) ? response.denuncia.instancia : '-';
      this.fdenuncia = (response.denuncia.fdenuncia) ? response.denuncia.fdenuncia : '-';
      this.fformalizacion = (response.denuncia.fformalizacion) ? response.denuncia.fformalizacion : '-';
      this.calificacion = (response.denuncia.calificacion) ? response.denuncia.calificacion : '-';
      this.faudiencia = (response.denuncia.faudiencia) ? response.denuncia.faudiencia : '-';
      this.remitido = (response.denuncia.remitido) ? response.denuncia.remitido : '-';
      console.log("response: "+response);
      this.loading.dismiss();
    })
    .catch(err => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({ title: 'Error', message: 'Error al buscar información de la denuncia', buttons: ['Ok'] });
      console.log("error: "+err);
      alert.present();
    });
  }

}
