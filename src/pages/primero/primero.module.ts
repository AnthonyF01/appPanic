import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrimeroPage } from './primero';

@NgModule({
  declarations: [
    PrimeroPage,
  ],
  imports: [
    IonicPageModule.forChild(PrimeroPage),
  ],
})
export class PrimeroPageModule {}
