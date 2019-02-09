import { Component } from '@angular/core';
import { /*ToastController,*/ Events, IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { DenunciaProvider } from '../../providers/denuncia/denuncia';
// import { DeviceTokenProvider } from '../../providers/deviceToken/deviceToken';
import { NetworkProvider } from '../../providers/network/network';
import { UserProvider } from '../../providers/user/user';

import { decodeLaravelErrors } from '../../functions/Helpers';
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';

import { Network } from '@ionic-native/network';

// @IonicPage()  ==>  usa el archivo auth.module.ts
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  isenabled: any = false;
  token: any;
  responseLogin: any;
  segment: string = "login";
  loading: any;
  formLogin: any = {
    email: '',
    password: '',
  };
  formRegister: any = {
    dni: '',
    nombre: '',
    tbldepartamento_id: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    token: '',
  }

  flag:any = 0;

  departments: Array<{ value:string, name:string }>;

  constructor(
    private ev: Events,
    // public toast:ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private authService: AuthProvider,
    private denunciaService: DenunciaProvider,
    // private deviceService: DeviceTokenProvider,
    private networkService: NetworkProvider,
    private network: Network,
    private userService: UserProvider,
  ) {
    // this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    
    // this.isConnect();

    // get token from provider
    this.authService.getTokenDevice()
      .then((token: any) => {
        this.token = token;
        this.formRegister.token = token;
        console.log('getting stored deviceToken: '+ token);
      })
      .catch(err => {
        console.log('error on get token: '+err);
      });

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
        alert.setMessage('Error al obtener los departamentos<br>'+err);
        alert.present();
      });
  }

  ionViewDidLoad() {
    this.checkAuthenticated();
  }

  async checkAuthenticated () 
  {
    try {
      let isAuthenticated = await this.authService.checkIsAuthenticated();
      if ( isAuthenticated ) {
        this.menuCtrl.enable(true);
        // this.navCtrl.setRoot(HomePage);
        this.navCtrl.setRoot(DashboardPage);
      }
    } catch (err) {
      console.log(err);
      let alert = this.alertCtrl.create({ title: 'Error', message: 'Error al verificar la sesion del usuario', buttons: ['Ok'] });
      alert.present();
    }
  }

  doLogin (data: any) 
  {
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();

    this.authService.login(data)
      .then((response: any) => {

        console.log("HomePage");
        // this.loading.dismiss();
        this.authService.storeCredentials(response);

        
        this.authService.registerDeviceToken()
          .then((response: any) => {
            this.loading.dismiss();
          
            // si puede continuar
            if (response) {
              // check user permission
              this.userService.checkAccess()
                .then((response: any) => {
                  this.authService.storeAccessType(response);
                  console.log("AccessType: "+response);
                })
                .catch(err => {
                  console.log("Error al verificar los permisos: "+err);
                });
              setTimeout(() => {
                this.checkAuthenticated()
              }, 750);
            }else{
              // sino puede continuar
              let alert = this.alertCtrl.create({ 
                title: 'Error', 
                message: 'Este dispositivo está registrado a nombre de otro usuario, por favor inicie sesión en uno diferente.', 
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.authService.removeCredentials();
                      this.navCtrl.setRoot(AuthPage);
                    }
                  }
                ] 
              });
              alert.present();
            }
          })
          .catch(err => {
            this.loading.dismiss();
            console.log("Error on find device token: "+err);
          });

      })
      .catch(err => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok'] });
        if ( err.status == 400 ) {
          alert.setMessage(`${err.error.hint}`);
        } else if (err.status == 401) {
          alert.setMessage(`${err.error.message}`);
        } else {
          alert.setMessage('Error desconocido al iniciar sesión');
        }
        alert.present();
      });
  }

  doRegister () 
  {
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();
    this.authService.register(this.formRegister)
      .then((response: any) => {
        this.loading.dismiss();
        console.log(response);
        this.doLogin({
          email: this.formRegister.email,
          password: this.formRegister.password,
        });
      })
      .catch((err: any) => {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok']});
        if (err.status == 422) {
          let decodedErrors: any = decodeLaravelErrors(err)
          alert.setMessage(decodedErrors.errors.join('<br>'));
        } else {
          alert.setMessage('Error desconocido al registrarse');
        }
        alert.present();
      })
  }

  validateLoginData (data: any) 
  {
    return true;
  }

  showInfo() {
    let alert = this.alertCtrl.create({ title: 'Info', message: 'Deberá proveer mas datos posteriormente.', buttons: ['Ok'] });
    alert.present();
  }

  isConnect(){

    // check connection
    this.networkService.checkConnection()
      .then((response: any) => {
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok'] });
        alert.setMessage('Conexion exitosa al servidor');
        alert.present();
      })
      .catch(err => {
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok'] });
        alert.setMessage('Error al obtener el recurso');
        alert.present();
      });

    // this.networkService.checkConnection().subscribe((response: any) => {
    //     console.log(response);
    //   },
    //   err => {
    //       console.log(err);
    //   });

    // .then((response: any) => {
      //   debugger
      //   if (response.success) {
      //     console.log("Conectado a internet");
      //   }
      // })
      // .catch((err: any) => {        
      //   debugger
      //   let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok']});
      //   alert.setMessage('Ha ocurrido un error, verifique su conexion a internet');
      //   alert.present();
      // })
  }

  onChange(selectedValue: any){
    if (selectedValue == 1) {
      this.flag = true; // pnp
    }else{
      this.flag = false; // vct
    }
    // alert(selectedValue);
  }

  findDNI (search:string) {
    this.loading = this.loadingCtrl.create({content: 'Espere ...'});
    this.loading.present();
    console.log('finding DNI');
    this.denunciaService.findVictima(search)
    .then((response: any) => {
      if (typeof response.victima !== 'undefined' && typeof response.victima.nombre !== 'undefined') {
        // alert(response.victima.msg+" - "+response.victima.nombre);
        this.isenabled = true;
        this.formRegister.nombre = response.victima.nombre;
        this.formRegister.tbldepartamento_id = response.victima.tbldepartamento_id;
        this.formRegister.dni = response.victima.nro_doc;
        this.formRegister.name = '';
        this.formRegister.email = '';
        this.formRegister.password = '';
        this.formRegister.password_confirmation = '';
        this.loading.dismiss();
      }else{
        this.isenabled = false;
        this.formRegister.nombre = '';
        this.formRegister.tbldepartamento_id = '';
        this.formRegister.dni = '';
        this.formRegister.name = '';
        this.formRegister.email = '';
        this.formRegister.password = '';
        this.formRegister.password_confirmation = '';
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Info', message: response.msg, buttons: ['Ok'] });
        alert.present();
      }
    })
    .catch(err => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({ title: 'Error', message: 'El usuario no registra ningun expediente.', buttons: ['Ok'] });
      console.log("error: "+err);
      alert.present();
    });
  }

}
