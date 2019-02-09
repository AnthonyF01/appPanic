import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AlertController, Events, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from '../auth/auth';
import { Service } from '../../settings/Laravel';

// dos formas => usando el plugin o haciendo peticiones constantes en el constructor 
// de cada pag usando providers

// Ejecutar: 
// ionic cordova plugin add cordova-plugin-network-information
// npm install --save @ionic-native/network

export enum ConnectionStatusEnum {
    Online,
    Offline
}

@Injectable()
export class NetworkProvider {

    // public previousStatus;
    public previousStatus: ConnectionStatusEnum;
    private _status: BehaviorSubject<ConnectionStatusEnum> = new BehaviorSubject(null);

    constructor(
        public alertCtrl: AlertController,            
        public network: Network,
        public eventCtrl: Events,
        public http: Http,
        private authService: AuthProvider,
        private storage: Storage,
        public toast: ToastController,
    ) {
        console.log('Hello NetworkProvider Provider');
        this.previousStatus = ConnectionStatusEnum.Online;
    }

    public initializeNetworkEvents(): void {
        /* OFFLINE */
        this.network.onDisconnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                // this.eventCtrl.publish('network:offline');
                this.setStatus(ConnectionStatusEnum.Offline);

                this.toast.create({
                    message: 'Desconectado de la red',
                    duration: 3000
                }).present();
            }
            // this.previousStatus = ConnectionStatusEnum.Offline;
        });

        /* ONLINE */
        this.network.onConnect().subscribe(() => {
            // se otorga a la aplicacion 3s para comprobar la conexion a internet
            // setTimeout(() => {
                if (this.previousStatus === ConnectionStatusEnum.Offline) {
                    // this.eventCtrl.publish('network:online');
                    this.setStatus(ConnectionStatusEnum.Online);

                    this.toast.create({
                        message: 'En linea',
                        duration: 3000
                    }).present();
                }
                // this.previousStatus = ConnectionStatusEnum.Online;
            // }, 3000);
        });
    }
    
    // access methods 
    public getNetworkType(): string {
        return this.network.type
    }

    public getNetworkStatus(): Observable<ConnectionStatusEnum> {
        return this._status.asObservable();
    }
    
    private setStatus(status: ConnectionStatusEnum) {
        this.previousStatus = status;
        this._status.next(this.previousStatus);
    }

    // custom menthod for check connection 
    // checkConnection() {
    //     return this.http.get(`${Service.apiUrl}/checkConnection`)
    //             .map(res => res.json())
    //             .catch(error => new Observable(error.json()));
    // }

    async checkConnection () 
    {
        return this.http.get(`${Service.apiUrl}/checkConnection`).toPromise()
    }

}
