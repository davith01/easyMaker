import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { LoadingController, ToastController} from 'ionic-angular';
import { AuthUserProvider } from '../../providers/auth-user/auth-user';
import { RestProvider } from '../../providers/rest/rest';

export interface ResponseRestInterface {
  data?: any;
  message?: string;
  error?: any;
}
 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	
  loginEmail: string;
  loginPassword: string;
  userSession: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authUser: AuthUserProvider, public restProvider: RestProvider, private fb: Facebook, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  	  fb.getLoginStatus()
		.then(res => {
		  if(res.status === "connect") {
			  this.goToHome('Facebook',res);
			  this.getUserFacebookDetail(res.authResponse.userID);
		  }
		})
		.catch(e => { 
			console.log(e); 
			this.showToast(JSON.stringify(e));
		});
  }
  
  facebookLogin() {
	  this.fb.login(['public_profile', 'user_friends', 'email'])
		.then(res => {
		  if(res.status === "connected") {
			this.getUserFacebookDetail(res.authResponse.userID);
		  } 
		})
		.catch(e => { 
			console.log('Error logging into Facebook', e);
			this.showToast(JSON.stringify(e));
		});
  }
  
  getUserFacebookDetail(userid) {
	  this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
		.then(res => {
			this.goToHome('Facebook',res);
		})
		.catch(e => {
		  this.showToast(JSON.stringify(e));
		});
  }    
  
  goToHome(type,data) {
	  
	if(type === 'Anonymous'){
		data = { 'type': type, 'data': { 'type': 'Anonymous' } };
	}
	else if(type === 'Login') {
		data = { 'type': type, 'data': {'email': this.loginEmail, 'password':this.loginPassword}};
	}
	else if(type === 'Facebook') {
		data = { 'type': type, 'data': data};
	}
	
	let messageErr = 'Can\'t get user session';
	
	let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
	});
	
	loading.present().then(() => { //start the loading component
		//invoke rest services
		this.restProvider.getUserSession(data).then((result: ResponseRestInterface) => {
		 
		  loading.dismiss(); //stop the loading component
		  
		  this.userSession = JSON.stringify(result);
		  
		  if(result.data) {
			this.authUser.initSession(result.data);
			if(this.loginPassword === '123' ) 
			  this.navCtrl.setRoot('MenuPage');
		  }
		  if(result.error) {
			this.showToast(messageErr);
		  }
		  
		});
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