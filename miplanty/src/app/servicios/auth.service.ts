import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private AFauth : AngularFireAuth, private AFD : AngularFireDatabase) {
    AFauth.authState.subscribe(user=>{
      console.log(user);
    })
  }

  login(email:string, password:string){
    return this.AFauth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return new Promise((resolve, rejected) =>{
      this.AFauth.signOut().then(res =>{
        resolve(res);
      }).catch(err => rejected(err))
    });
  }
  /*
  getUser(): Promise<firebase.auth.User> {
    return this.AFauth.authState.pipe(first()).toPromise();
  } */
}
