import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SegundoPage } from './segundo';

@NgModule({
  declarations: [
    SegundoPage,
  ],
  imports: [
    IonicPageModule.forChild(SegundoPage),
  ],
})
export class SegundoPageModule {}
