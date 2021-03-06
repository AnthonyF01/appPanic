import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class DenunciaProvider {

  constructor(public http: HttpClient, private storage: Storage) {
  }

  async findExpediente (search:string) 
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/denuncia/search/${search}`, { headers }).toPromise()
  }

  async findVictima (search:string) 
  {
    return this.http.get(`${Service.apiUrl}/denuncia/victima/search/${search}`).toPromise()
  }

  async detailsVictimaExp (){
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/denuncia/victima/details`, { headers }).toPromise();
  }

  async detailsExpediente (search:string) 
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/denuncia/details/${search}`, { headers }).toPromise()
  }

  async getDepartment () 
  {
    return this.http.get(`${Service.apiUrl}/denuncia/department`).toPromise()
  }

}
