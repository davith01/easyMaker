import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserProvider } from '../../providers/auth-user/auth-user';
import { LoadingController, ToastController} from 'ionic-angular';

@Injectable()
export class RestProvider {

  apiUrl = 'http://fundacionjesusdenazareth.org/easy-maker/rest';
  
  constructor(public http: HttpClient, public httpClient: HttpClient, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public authUser: AuthUserProvider) {
  }
  
  httpSendWithAuthorization(url,data) {
	
	const headers = new HttpHeaders({
      Authorization: this.authUser.getToken()
    });
	
	let sendHttp: any;
	
	if(data) {
	   data = JSON.stringify(data);
	   sendHttp = this.http.post(url,data,{ headers } );
	}
	else {
	   sendHttp = this.http.get(url,{ headers }); 
	}
	
	return new Promise(resolve => {
	   sendHttp
	   .subscribe((result) => {
		 resolve(result);
		 
	   }, error  => { 
 		 console.log(error);
		 resolve({error:error});
	   });
	});
  }
  
  httpSend(url,data) {
	
	let sendHttp: any;
	if(data) {
	   data = JSON.stringify(data);
	   sendHttp = this.http.post(url,data);
	}
	else {
	   sendHttp = this.http.get(url); 
	}
	
	return new Promise(resolve => {
	   sendHttp
	   .subscribe((result) => {
		 resolve(result);
		 
	   }, error  => { 
 		 console.log(error);
		 resolve({error:error});
	   });
	});
  }

  getUserSession(data) {
	  let url = this.apiUrl+'/auth-session/login.php';
	  return data.type === 'Cached' ? this.httpSendWithAuthorization(url,data) : this.httpSend(url,data);
  }
  
  getProducts() {
	  let url = this.apiUrl+'/product/read.php';
	  return this.httpSend(url,null);
  }
  
  getPromotions() {
	  let url = this.apiUrl+'/promotion/read.php';
	  return this.httpSend(url,null);
  }
  
  getProduct(product) {
	  let url = this.apiUrl+'/product/read_one.php?id='+product.id;
	  return this.httpSend(url,null);
  }
  
  getPromotion(promotion) {
	  let url = this.apiUrl+'/promotion/read_one.php?id='+promotion.id;
	  return this.httpSend(url,null);
  }
  
  getShoppingCartByUser() {
	  let url = this.apiUrl+'/shopping-cart/read.php';
	  return this.httpSendWithAuthorization(url,null);
  }
   
  addShoppingCart(data) {
	  let url = this.apiUrl+'/shopping-cart/add.php';
	  return this.httpSendWithAuthorization(url,data);
  }
  
}
