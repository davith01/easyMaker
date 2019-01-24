import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserProvider } from '../../providers/auth-user/auth-user';
import { LoadingController, ToastController} from 'ionic-angular';

@Injectable()
export class RestProvider {

  apiUrl = 'http://fundacionjesusdenazareth.org/easy-market/rest';
  
  constructor(public http: HttpClient, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public authUserProvider: AuthUserProvider) {
  }
  
  httpSend(url,data) {
	let dat = typeof data === "object" ? JSON.stringify(data) : data;
	
	let sendHttp = dat ? this.http.post(url,dat) : this.http.get(url); 
	
	return new Promise(resolve => {
	   sendHttp.subscribe(data => {
 		 resolve({data:data,err:null});
	   }, err => { 
 		 console.log(err);
		 resolve({data:null,err:err});
	   });
	});
  }

  getProducts() {
	  let url = this.apiUrl+'/product/read.php';
	  return this.httpSend(url,null);
  }
  
  getPromotions() {
	  let url = this.apiUrl+'/promotion/read.php';
	  return this.httpSend(url,null);
  }
  
  getPromotion(promotion) {
	  let url = this.apiUrl+'/promotion/read.php?promotionId='+promotion.id;
	  return this.httpSend(url,null);
  }
  
  getShoppingCartByUser() {
	  let userSession = this.authUserProvider.getSession();	
	  let url = this.apiUrl+'/shopinng-cart/read.php?userId='+userSession.id;
	  return this.httpSend(url,null);
  }
   
  addShoppingCart(data) {
	  let url = this.apiUrl+'/shopinng-cart/add.php';
	  return this.httpSend(url,data);
  }
  
  getUserSession(data) {
	  let url = this.apiUrl+'/auth-session/login.php';
	  return this.httpSend(url,data);
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

