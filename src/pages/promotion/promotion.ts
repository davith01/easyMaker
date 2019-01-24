import { Component, ViewChild } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController, ToastController} from 'ionic-angular';
import { AuthUserProvider } from '../../providers/auth-user/auth-user';
 
@IonicPage()
@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
})
export class PromotionPage {

  promotion: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authUser: AuthUserProvider, public alertCtrl: AlertController,public restProvider: RestProvider,public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }
  
  getPromotion() {
	let data = this.navParams.data;
	
	if(data.promotion) {
		this.promotion = data.promotion;
	} else if(data.shoppingCart && data.shoppingCart.promotion){
		this.promotion = data.shoppingCart.promotion;
	}
	
	if(this.promotion) {
		
		let messageErr = 'Can\'t get Promotion item';
	
		let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
		});

		loading.present().then(() => {
			this.restProvider.getPromotion(this.promotion).then(result => {
				  loading.dismiss();
				  let res: any = result;
				  if(res.data) { 
					this.promotion = res.data;
				  }
				  else if(res.err) {
					  this.showToast(messageErr);
				  }
			});
		});
	}
	
  }
 
  sendToShoppingCart() {
    
	let navCtrl = this.navCtrl;
	let restProvider = this.restProvider;
	
	let data = {
		promotionId: this.promotion.id,
		productId: null,
		userId: this.authUser.getSession().id,
		quantity: 1,
		price: this.promotion.price
	};
	
	let messageErr = 'Can\'t add to shopping cart';
	
	let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
	});
	
	loading.present().then(() => {
		restProvider.addShoppingCart(data).then(result => {
			  loading.dismiss();
			  let res: any = result;
			  if(res.data) { 
				navCtrl.parent.select(1);
			  }
			  else if(res.err) {
				  this.showToast(messageErr);
			  }
		});
	});
  }
  
  doPromptAddOrder() {
	let prompt = this.alertCtrl.create({
      title: 'Add to shopping cart',
      //message: "Confirm <b>that</b> you wish the add to shopping card <ul><li>title $ "+this.promotion.title+"</li><li>price $ "+this.promotion.price+"</li><ul>",
	  message: "Do you want to add the product to the shopping cart?",
      buttons: [
        { text: 'Cancel' },
        { text: 'Add',
          handler: data => {
			this.sendToShoppingCart();
          }
        }
      ]
    });
    prompt.present();
  }
  
  ionViewWillEnter(){
	  this.getPromotion();
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