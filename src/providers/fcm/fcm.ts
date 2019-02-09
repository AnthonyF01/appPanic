import { Injectable } from '@angular/core';
import { FCM, NotificationData } from '@ionic-native/fcm';

@Injectable()
export class FcmProvider {

    constructor(
        private fcm: FCM,
    ) {
    }

    getTokenDevice (){
        return new Promise((resolve) => {
            this.fcm.getToken()
            .then((token:string) => {
                console.log("FcmProvider -- fcm.getToken(): "+token);
                // return token;
                resolve(token);
            })
            .catch(error => {
                console.log("FcmProvider -- Error - fcm.getToken(): "+error);
                // return null;
                resolve(0);
            });
        });
    }

}