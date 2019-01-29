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
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  product: any;
  price: number;
  quantity: number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authUser: AuthUserProvider, public alertCtrl: AlertController,public restProvider: RestProvider,public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
		this.getProduct();
  }

  //retrive product 	
  getProduct() {
	
	let data = this.navParams.data;
	
	if(data.product) {
		
		this.product = data.product;
		this.quantity = data.quantity || 1;
		this.price = data.price;
		
		let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
		});

		loading.present().then(() => { //start the loading component
			//invoke rest services
			this.restProvider.getProduct(this.product).then((result: ResponseRestInterface)  => {
		
				  loading.dismiss(); //stop the loading component
				  
				  if(result.data) { 
					this.product = result.data;
					this.price = this.product.price;
				  }
				  else if(result.error) {
					  let messageErr = 'Can\'t add to shopping cart';
					  this.showToast(messageErr);
				  }
			});
		});
	}
	
  }
 
  //add product to shopping cart
  sendToShoppingCart() {
    
	let navCtrl = this.navCtrl;
	let restProvider = this.restProvider;
	
	let data = {
		product: { id: this.product.id },
		promotion: null,
		quantity: this.quantity,
		price: this.price
	};
	
	let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
	});
	
	loading.present().then(() => { //start the loading component
	
		//invoke rest services
		restProvider.addShoppingCart(data).then((result: ResponseRestInterface)  => {
			  
			  loading.dismiss(); //stop the loading component
			  
			  if(result.data) { 
				navCtrl.parent.select(1);
			  }
			  else if(result.error) {
				  let messageErr = 'Can\'t add to shopping cart';
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