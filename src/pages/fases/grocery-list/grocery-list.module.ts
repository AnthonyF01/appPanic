import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroceryListPage } from './grocery-list';

@NgModule({
  declarations: [
    GroceryListPage,
  ],
  imports: [
    IonicPageModule.forChild(GroceryListPage),
  ],
})
export class GroceryListPageModule {}
