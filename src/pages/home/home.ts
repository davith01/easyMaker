import { Component } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { IonicPage, NavController } from 'ionic-angular';
import { LoadingController, ToastController} from 'ionic-angular';

export interface ResponseRestInterface {
  data?: any;
  message?: string;
  error?: any;
}

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  promotions: any;
  products: any;
  
  constructor(public navCtrl: NavController, public restProvider: RestProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }
  
  getProductList() {
	//invoke rest services
	this.restProvider.getProducts().then((result: ResponseRestInterface) => {
	  
	  if(result.data) { 
		this.products = result.data;
	  }
	  else if(result.error) {
		  let messageErr = 'Can\'t get products list';
		  this.showToast(messageErr);
	  }
	});
  }
  
  getPromotionList() {
	//invoke rest services
	this.restProvider.getPromotions().then((result: ResponseRestInterface) => {
	  
	  if(result.data) { 
		this.promotions = result.data;
	  }
	  else if(result.error) {
		  let messageErr = 'Can\'t get Promotions list';
		  this.showToast(messageErr);
	  }
	});
  }
  
  goToPromotion(promotion) {
	 this.navCtrl.push('PromotionPage',{promotion:promotion});
  }
  
  goToProduct(product) {
	 this.navCtrl.push('ProductPage',{product:product}); 
  }
  
  ionViewWillEnter(){
	  
	  let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
	  });
	
	  loading.present().then(() => { //start the loading component
		this.getPromotionList();
		this.getProductList();
		loading.dismiss(); //stop the loading component
	  });
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
