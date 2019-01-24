import { Component } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { IonicPage, NavController } from 'ionic-angular';
import { LoadingController, ToastController} from 'ionic-angular';

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
  
  getProducts() {
	let messageErr = 'Can\'t get products list';
	
	this.restProvider.getProducts().then(result => {
	  let res: any = result;
	  if(res.data) { 
		this.products = res.data;
	  }
	  else if(res.err) {
		  this.showToast(messageErr);
	  }
	});
  }
  
  getPromotions() {
	let messageErr = 'Can\'t get Promotion list';
	
	this.restProvider.getPromotions().then(result => {
	  let res: any = result;
	  console.log(res);
	  if(res.data) { 
		this.promotions = res.data;
	  }
	  else if(res.err) {
		  this.showToast(messageErr);
	  }
	});
  }
  
  goToPromotion(promotion) {
	 this.navCtrl.push('PromotionPage',{promotion:promotion});
  }
  
  ionViewWillEnter(){
	  let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
	  });
	
	  loading.present().then(() => {
		this.getPromotions();
		this.getProducts();
		loading.dismiss();
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
