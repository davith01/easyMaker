import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { LoadingController, ToastController} from 'ionic-angular';
import { AuthUserProvider } from '../../providers/auth-user/auth-user';
import { RestProvider } from '../../providers/rest/rest';
 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	
  userLogin: any;
  loginEmail: string;
  loginPassword: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authUser: AuthUserProvider, public restProvider: RestProvider, private fb: Facebook, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  	  fb.getLoginStatus()
		.then(res => {
		  if(res.status === "connect") {
			  this.goToHome('Facebook',res);
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
		data = {'type': 'Anonymous'};
	}
	else if(type === 'Login') {
		data = {'email': this.loginEmail, 'password':this.loginPassword};
	}
	
	//this.userLogin = JSON.stringify(data);
	//this.navCtrl.setRoot('MenuPage');
	this.getUserSession({ 'type': type, 'data': data });
  }
  
  getUserSession(data) {
	  
	let messageErr = 'Can\'t get session user';
	
	let loading = this.loadingCtrl.create({
		  content: 'Please wait...'
	});
	
	loading.present().then(() => {
		
		this.restProvider.getUserSession(data).then(result => {
		  
		  let res: any = result;
		  loading.dismiss();
		  
		  if(res.data) {
			//this.userLogin = JSON.stringify(res.data);
			let userSession = res.data && res.data.data ? res.data.data : res.data;
			this.authUser.initSession(userSession);
			this.navCtrl.setRoot('MenuPage');
		  }
		  else if(res.err) {
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