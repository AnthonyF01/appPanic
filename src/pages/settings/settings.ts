import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { DenunciaProvider } from '../../providers/denuncia/denuncia';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';

import { decodeLaravelErrors } from '../../functions/Helpers';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  loading: any;

  formRegister: any = {
    nombre: '',
    tbldepartamento_id: '',
    name: '',
    fono: '',
    direccion: '',
    // email: '',
    // password: '',
    // password_confirmation: '',
    // token: '',
  }

  departments: Array<{ value:string, name:string }>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private denunciaService: DenunciaProvider,
    private userService: UserProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthProvider,
  ) {

    // get departments
    this.denunciaService.getDepartment()
      .then((response: any) => {
        this.departments = [];
        for (let index = 0; index < response.departamento.length; index++) {
          this.departments.push({ value: response.departamento[index].id, name: response.departamento[index].nombre });          
        }
      })
      .catch(err => {
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok'] });
        alert.setMessage('Error al obtener los departamentos');
        alert.present();
      });
    
    // get user info
    this.getUserInfo();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  async getUserInfo(){
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();
    this.userService.getUserInfo()
      .then((response: any) => {
        this.loading.dismiss();
        this.formRegister.nombre = response.user.nombre;
        this.formRegister.tbldepartamento_id = response.user.tbldepartamento_id;
        this.formRegister.name = response.user.name;
        this.formRegister.fono = response.user.fono;
        this.formRegister.direccion = response.user.direccion;
      })
      .catch(err => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok'] });
        alert.setMessage('Error al obtener datos del usuario');
        alert.present();
      });
  }
  
  doUpdate () 
  {
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();
    this.authService.update(this.formRegister)
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
