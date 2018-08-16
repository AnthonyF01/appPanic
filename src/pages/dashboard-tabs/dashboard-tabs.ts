import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dashboard-tabs',
  templateUrl: 'dashboard-tabs.html',
})
export class DashboardTabsPage {

  tab1 = 'SettingsPage';
  tab2 = 'ProfilePage';

  @ViewChild('myTabs') tabsRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    debugger;
    let openTab = this.navParams.get('openTab');
    if (openTab) {
      this.tabsRef.select(openTab);
    }
  }

}
