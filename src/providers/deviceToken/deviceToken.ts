import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

import { AuthProvider } from '../auth/auth';

import { FCM, NotificationData } from '@ionic-native/fcm';


/*
* 
* Este proveedor YA NO SE USARA por dos razones:
* 
* 1. En este proveedor inyectable << @Injectable() >> se usa un metodo de otro proveedor    
*    injectable (AuthProvider), lo cual genera una "dependencia circular" que da errores de compilacion.
* 
* 2. Se debe refactorizar los dos proveedores en uno solo o crear un tercero, se opta por lo primero,
*    por lo que el codigo contenido en este archivo sera movido a << auth/auth.ts >>
* 
*/


@Injectable()
export class DeviceTokenProvider {

    token: any;

    constructor(
        public http: HttpClient, 
        private storage: Storage, 
        private fcm: FCM, 
        private authService: AuthProvider
    ) {
    }

    storeTokenDevice (data: any) {

        this.storage.set('deviceToken', data);
        // console.log('stored deviceToken: '+ this.storage.get('deviceToken'));

    }

    async getTokenDevice () 
    {   
        let token = await this.storage.get('deviceToken');
        this.token = token;
        return token;

        // obtener token del dispositivo (el token es unico para el dispositivo)
        /*this.fcm.getToken().then( 
            (token:string) => {
                // podria registrarse el token en este espacio
                console.log('token del dispositivo: ' + token);
            }
        ).catch(
            error => {
                console.log(error);
            }
        );*/
    }

    async registerDeviceToken (){
        let accessToken: any = await this.authService.getAccessToken();
        console.log("accessToken: "+accessToken);
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        });
        let data = JSON.stringify({
            client_id: Service.passport.client_id,
            token: this.token,
        });
        return this.http.post(`${Service.apiUrl}/register/registerDeviceToken`, data, { headers }).toPromise();
    }

}
