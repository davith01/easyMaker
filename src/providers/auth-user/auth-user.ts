import { Injectable } from '@angular/core';

@Injectable()
export class AuthUserProvider {

  userSession: any;
  
  constructor() {
  }
  
  getSession(){
	  return this.userSession;
  }
  
  initSession(userSession) {
	  this.userSession = userSession;
  }
  
  destroy() {
	  this.userSession = null;
  }

}
