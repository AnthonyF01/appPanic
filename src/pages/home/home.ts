import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  debugger;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title:string, component:string, openTab?:any, icon:string}>;
  // rootPage = 'DashboardTabsPage';
  rootPage = 'InicioPage';
  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: 'Inicio', component: 'InicioPage', icon: 'home' },
      { title: 'Buscar', component: 'NoTabsPage', icon: 'search' },
      { title: 'Dashboard', component: 'DashboardTabsPage', icon: 'list' },
      { title: 'My lists', component: 'ListsTabsPage', icon: 'bookmark' },
      // { title: 'Profile', component: 'DashboardTabsPage', icon: 'menu', openTab:1 },
      // { title: 'Comentarios', component: 'PrimeroPage', icon: 'chatbubbles' },
      { title: 'Contactanos', component: 'ContactPage', icon: 'call' },
      { title: 'Sugerencias', component: 'RecomendPage', icon: 'thumbs-up' },
      { title: 'Iniciar Sesion', component: 'LoginPage', icon: 'log-in' },
      { title: 'Registrarse', component: 'SignupPage', icon: 'person-add' },
      { title: 'Olvide mi contraseña', component: 'ForgotpassPage', icon: 'key' },
      { title: 'Restablecer Contraseña', component: 'ResetpassPage', icon: 'refresh' },
      { title: 'Example', component: 'PrimeroPage', icon: 'menu' },
    ];
  }
  openPage(page) {
    // debugger;
    this.nav.setRoot(page.component, { openTab: page.openTab })
  }

}
