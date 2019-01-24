import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-order',
  templateUrl: 'add-order.html',
})
export class AddOrderPage {

  promotion: any;
  user: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.promotion= this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOrderPage');
  }
  
  

}
