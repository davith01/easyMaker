import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Facebook } from "@ionic-native/facebook"; 

import { MyApp } from './app.component';
import { RestProvider } from '../providers/rest/rest';
import { AuthUserProvider } from '../providers/auth-user/auth-user';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
	Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    AuthUserProvider
  ]
})
export class AppModule {}
