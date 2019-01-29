import { Component } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController, ToastController} from 'ionic-angular';
import { AuthUserProvider } from '../../providers/auth-user/auth-user';

export interface ResponseRestInterface {
  data?: any;
  message?: string;
  error?: any;
}
 
@IonicPage()
@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
})
export class PromotionPage {

  promotion: any;
  price: number;
  quantity: number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authUser: AuthUserProvider, public alertCtrl: AlertController,public restProvider: RestProvider,public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
	  this.getPromotion();
  }
  
  getPromotion() {
	  
	let data = this.navParams.data;
	this.promotion = data.promotion;
	this.price = data.price;
	this.quantity = data.quantity || 1;
	
	if(this.promotion) {
		
		let messageErr = 'Can\'t get Promotion item';
	
		let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
		});

		loading.present().then(() => { //start the loading component
			
			//invoke rest services
			this.restProvider.getPromotion(this.promotion).then((result: ResponseRestInterface) => {
				
				  loading.dismiss();//stop the loading component
				  
				  if(result.data) {
					this.promotion = result.data;
					this.price = this.promotion.price;
				  }
				  else if(result.error) {
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
		promotion: { id: this.promotion.id },
		product: null,
		quantity: this.quantity,
		price: this.price
	};
	
	let messageErr = 'Can\'t add to shopping cart';
	
	let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
	});
	
	loading.present().then(() => { //start the loading component
		
		//invoke rest services
		restProvider.addShoppingCart(data).then((result: ResponseRestInterface) => {
			  
			  loading.dismiss(); //stop the loading component
			  
			  if(result.data) { 
				navCtrl.parent.select(1);
			  }
			  else if(result.error) {
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
	  
  }
  
  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });

    toast.present(toast);
  }
  
  removeQuantity() {
	 --this.quantity;
	 if(this.quantity < 0) this.quantity = 0;
  }
  addQuantity() {
	 ++this.quantity;
  }
  
}