import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { DenunciaProvider } from '../../../providers/denuncia/denuncia';
import { UserProvider } from '../../../providers/user/user';
import { AuthProvider } from '../../../providers/auth/auth';

import { decodeLaravelErrors } from '../../../functions/Helpers';

/**
 * Generated class for the ResetpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpass',
  templateUrl: 'resetpass.html',
})
export class ResetpassPage {

  loading: any;

  formRegister: any = {
    // nombre: '',
    // tbldepartamento_id: '',
    // name: '',
    // fono: '',
    // direccion: '',
    email: '',
    password: '',
    password_confirmation: '',
    // token: '',
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private denunciaService: DenunciaProvider,
    private userService: UserProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthProvider,
  ) {

    // get user info
    this.getUserInfo();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpassPage');
  }

  async getUserInfo(){
    this.userService.getUserInfo()
      .then((response: any) => {
        this.formRegister.email = response.user.email;
        // this.formRegister.tbldepartamento_id = response.user.tbldepartamento_id;
        // this.formRegister.name = response.user.name;
        // this.formRegister.fono = response.user.fono;
        // this.formRegister.direccion = response.user.direccion;
      })
      .catch(err => {
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok'] });
        alert.setMessage('Error al obtener datos del usuario');
        alert.present();
      });
  }

  async doReset() {
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();
    this.authService.reset(this.formRegister)
      .then((response: any) => {
        this.loading.dismiss();
        console.log(response);
        let alert = this.alertCtrl.create({ title: 'Info', message: response.success, buttons: ['Ok'] });
        alert.present();
      })
      .catch((err: any) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok']});
        if (err.status == 422) {
          let decodedErrors: any = decodeLaravelErrors(err)
          alert.setMessage(decodedErrors.errors.join('<br>'));
        } else {
          alert.setMessage('Error desconocido al actualizar datos');
        }
        alert.present();
      })
  }

}
