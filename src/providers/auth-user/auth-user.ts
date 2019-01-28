import { Injectable } from '@angular/core';

@Injectable()
export class AuthUserProvider {

  private userInfo: any;
  private token: string;  
  
  constructor() {
	this.token = window.localStorage.getItem('tokenEasyMaker');
	this.userInfo = window.localStorage.getItem('userInfoEasyMaker');
	if(this.token === 'undefined') {
		this.token = null;
		this.userInfo = null;
	}
  }
  
  initSession(data) {
	  this.token = data.token;
	  this.userInfo = data.userInfo;
	  window.localStorage.setItem('tokenEasyMaker', data.token);
	  window.localStorage.setItem('userInfoEasyMaker', data.userInfo);
  }
  
  getToken(){
	  return this.token;
  }
  
  getUserInfo(){
	  return this.userInfo;
  }
  
  destroy() {
	  this.token = null;
	  this.userInfo = null;
	  window.localStorage.removeItem('tokenEasyMaker');
	  window.localStorage.removeItem('userInfoEasyMaker');
  }

}
