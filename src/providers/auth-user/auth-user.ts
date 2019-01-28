import { Injectable } from '@angular/core';

@Injectable()
export class AuthUserProvider {

  private userInfo: any;
  private token: string;
  
  constructor() {
	this.token = window.localStorage.getItem('token');
	this.userInfo = window.localStorage.getItem('userInfo');
  }
  
  initSession(data) {
	  this.token = data.token;
	  this.userInfo = data.userInfo;
	  window.localStorage.setItem('token', data.token);
	  window.localStorage.setItem('userInfo', data.userInfo);
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
	  window.localStorage.removeItem('token');
	  window.localStorage.removeItem('userInfo');
  }

}
