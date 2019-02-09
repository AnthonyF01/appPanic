import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

import { AuthPage } from '../authLoginR/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  debugger;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title:string, component:string, openTab?:any, icon:string}>;
  pages2: Array<{title:string, component:string, openTab?:any, icon:string}>;
  // rootPage = 'DashboardTabsPage';
  // rootPage = 'AuthPage';
  rootPage = 'InicioPage';
  constructor(
    // public navCtrl: NavController, 
    private authService: AuthProvider,
    private menuCtrl: MenuController,
    private userService: UserProvider
  ) {

    // this.checkAccess();

    /*this.checkAccessType()
      .then( (response) => {
        this.pages = [];
        if (response) {
          console.log("Administrador loagueado.");
          this.pages = [
            { title: 'Botón de Pánico', component: 'InicioPage', icon: 'home' },
            { title: 'Expedientes', component: 'NoTabsPage', icon: 'search' },
            { title: 'Notificaciones', component: 'ListNotificationPage', icon: 'notifications' },
            { title: 'Restablecer Contraseña', component: 'ResetpassPage', icon: 'refresh' },
          ];
        }else {
          console.log("Usuario loagueado.");
          this.pages = [
            { title: 'Botón de Pánico', component: 'InicioPage', icon: 'home' },
            { title: 'Expedientes', component: 'NoTabsPage', icon: 'search' },
            { title: 'Restablecer Contraseña', component: 'ResetpassPage', icon: 'refresh' },
          ];
        }
        this.pages2 = [];
        this.pages2 = [
          // { title: 'Configuración', component: 'SettingsPage', icon: 'cog' },
          { title: 'Perfil', component: 'SettingsPage', icon: 'cog' },
          { title: 'Acerca de', component: 'InfoPage', icon: 'information-circle' },
        ];
      })
      .catch(error => {
        console.log(error);
      });*/

    /*this.pages = [
      // { title: 'Auth', component: 'AuthPage', icon: 'log-in' },
      { title: 'Botón de Pánico', component: 'InicioPage', icon: 'home' },
      { title: 'Expedientes', component: 'NoTabsPage', icon: 'search' },
      { title: 'Notificaciones', component: 'ListNotificationPage', icon: 'notifications' },
      // { title: 'Dashboard', component: 'DashboardTabsPage', icon: 'list' },
      // { title: 'Fases', component: 'ListsTabsPage', icon: 'bookmark' },
      // { title: 'Contactos', component: 'ContactPage', icon: 'contacts' },
      // { title: 'Sugerencias', component: 'RecomendPage', icon: 'thumbs-up' },
      // { title: 'Iniciar Sesion', component: 'LoginPage', icon: 'log-in' },
      // { title: 'Registrarse', component: 'SignupPage', icon: 'person-add' },
      // { title: 'Olvide mi contraseña', component: 'ForgotpassPage', icon: 'key' },
      { title: 'Restablecer Contraseña', component: 'ResetpassPage', icon: 'refresh' },
      // { title: 'Example', component: 'PrimeroPage', icon: 'menu' },
    ];*/

  }

  ionViewDidLoad() {
    // this.checkAccess();
  }

  // sincrono
  // se dispara despues de ionViewWillEnter() con los eventos completados
  ionViewDidEnter (){

  }

  // asincrono => request al servidor
  // se ejecuta cuando la pagina esta a punto de entrar y se convierte en la pagina activa
  ionViewWillEnter(){  
    // this.checkAccess();
    this.checkAccessType()
      .then( (response) => {
        this.pages = [];
        if (response) {
          console.log("Administrador loagueado.");
          this.pages = [
            { title: 'Botón de Pánico', component: 'InicioPage', icon: 'home' },
            { title: 'Expedientes', component: 'NoTabsPage', icon: 'search' },
            { title: 'Notificaciones', component: 'ListNotificationPage', icon: 'notifications' },
            { title: 'Restablecer Contraseña', component: 'ResetpassPage', icon: 'refresh' },
          ];
        }else {
          console.log("Usuario loagueado.");
          this.pages = [
            { title: 'Botón de Pánico', component: 'InicioPage', icon: 'home' },
            { title: 'Expedientes', component: 'NoTabsPage', icon: 'search' },
            { title: 'Restablecer Contraseña', component: 'ResetpassPage', icon: 'refresh' },
          ];
        }
        this.pages2 = [];
        this.pages2 = [
          // { title: 'Configuración', component: 'SettingsPage', icon: 'cog' },
          { title: 'Perfil', component: 'SettingsPage', icon: 'cog' },
          { title: 'Acerca de', component: 'InfoPage', icon: 'information-circle' },
        ];
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  async ionViewCanEnter () {
    let isAuthenticated = await this.authService.checkIsAuthenticated();
    return isAuthenticated;
  }

  async checkAccessType (){
    let access = await this.authService.getAccessType();
    return access;
  }

  async checkAccess (){
    this.userService.checkAccess()
      .then((response: any) => {
        this.pages = [];
        if (response) {
          console.log("Administrador loagueado.");
          this.pages = [
            { title: 'Botón de Pánico', component: 'InicioPage', icon: 'home' },
            { title: 'Expedientes', component: 'NoTabsPage', icon: 'search' },
            { title: 'Notificaciones', component: 'ListNotificationPage', icon: 'notifications' },
            { title: 'Restablecer Contraseña', component: 'ResetpassPage', icon: 'refresh' },
          ];
        }else {
          console.log("Usuario loagueado.");
          this.pages = [
            { title: 'Botón de Pánico', component: 'InicioPage', icon: 'home' },
            { title: 'Expedientes', component: 'NoTabsPage', icon: 'search' },
            { title: 'Restablecer Contraseña', component: 'ResetpassPage', icon: 'refresh' },
          ];
        }
        this.pages2 = [];
        this.pages2 = [
          // { title: 'Configuración', component: 'SettingsPage', icon: 'cog' },
          { title: 'Perfil', component: 'SettingsPage', icon: 'cog' },
          { title: 'Acerca de', component: 'InfoPage', icon: 'information-circle' },
        ];
      })
      .catch(err => {
        console.log("Error al verificar los permisos: "+err);
      });
  }

  openPage(page) {
    console.log("isAuthenticated: "+this.ionViewCanEnter());
    this.nav.setRoot(page.component, { openTab: page.openTab });
  }

  logout () {
    this.authService.logout()
    .then((response: any) => {
        if (response) {
          this.authService.removeCredentials(); // elimina datos del storage
          this.authService.removeTokenDevice(); // elimina datos del storage
          setTimeout(() => {
            this.menuCtrl.enable(false);
            this.nav.setRoot(AuthPage);
          }, 750);
        }
      })
      .catch(err => {
        console.log("Error on logout: "+err);
      });
  }

}
