import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';


const firebaseConfig = {
  apiKey: "AIzaSyDNiyFcye6U5eOv2aaNRe_tAlJgYbvfAVI",
  authDomain: "mi-planty.firebaseapp.com",
  databaseURL: "https://mi-planty-default-rtdb.firebaseio.com",
  projectId: "mi-planty",
  storageBucket: "mi-planty.appspot.com",
  messagingSenderId: "1092620526838",
  appId: "1:1092620526838:web:d9bfa1cd4bc92b1221b8d7"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, BluetoothSerial],
  bootstrap: [AppComponent]
})
export class AppModule {}
