import { Component } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  shoppingCarts: any = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }
  
  getShoppingCart() {
	  let messageErr = 'Can\'t read to shopping cart';
	  
	  let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
	  });
	  
	  loading.present().then(() => {
	    this.restProvider.getShoppingCartByUser().then(result => {
		    loading.dismiss();
			let res: any = result;
		    if(res.data) { 
			  this.shoppingCarts = res.data;
		    }
		    else if(res.err) {
			  this.showToast(messageErr);
		    }
	     });
	  });
	  
  }
  
  goToShoppingCart(shoppingCart){
	   this.navCtrl.push('PromotionPage',{shoppingCart:shoppingCart});
  }
  
  ionViewWillEnter(){
	  this.getShoppingCart();
  }
  
  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });

    toast.present(toast);
  }

}
