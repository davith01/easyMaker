import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';
import { AuthUserProvider } from '../../providers/auth-user/auth-user';
 
export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
 
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = 'TabsPage';
 
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
 
  pages = [
    { title: 'Home', pageName: 'TabsPage', tabComponent: 'tab1Root', index: 0, icon: 'home' },
    { title: 'Shopping cart', pageName: 'TabsPage', tabComponent: 'tab2Root', index: 1, icon: 'cart' },
    { title: 'Orders', pageName: 'TabsPage', tabComponent: 'tab3Root', index: 2, icon: 'paper-plane' },
	{ title: 'Promotions', pageName: 'TabsPage', tabComponent: 'tab4Root', index: 3, icon: 'trending-up' }
  ];
  
  constructor(public navCtrl: NavController,public fb: Facebook, public platform: Platform,public authUser: AuthUserProvider) {
	
  }
  
  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
	let childNav = this.nav.getActiveChildNavs()[0];
	
    // The active child nav is our Tabs Navigation
    if (childNav && page.index != undefined) {
      
	  childNav.select(page.index);
	  
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }
 
  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }
  
  logOut() {
	if(this.authUser.getUserInfo().loginType!=='FBK'){

		this.authUser.destroy();
		let params = { 'message': 'logout successs'};
		this.navCtrl.setRoot('LoginPage', params);
	}
	else {
		this.logOutFacebook();
	}
	
  }
  
  logOutFacebook() {
	if (this.platform.is('cordova')) {
		 this.fb.getLoginStatus().then( data=>{
			if (data.status =='connected'){
			  this.fb.logout();
			  let params = { 'message': 'logout successs'};
			  this.navCtrl.setRoot('LoginPage', params);
			}
		 });
	 }
  }
		
	   
	 
}