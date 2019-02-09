import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class NotificationProvider {

  constructor(public http: HttpClient, private storage: Storage) {
  }

  async sendNotificationInfo (lat:any, lng: any, acc: any) 
  {
    let auth: any = await this.storage.get('auth');
    let params: any;
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/sendNotification?lat=${lat}&lng=${lng}&acc=${acc}`, { headers }).toPromise()
  }

  async getNotification() {
    let auth: any = await this.storage.get('auth');
    let params: any;
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/getNotification`, { headers }).toPromise()
  }

  async checkNotification(check:any,idnot:any){
    let auth: any = await this.storage.get('auth');
    let params: any;
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/checkNotification?check=${check}&idnot=${idnot}`, { headers }).toPromise();
  }

}
