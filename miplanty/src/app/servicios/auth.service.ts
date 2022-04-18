import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  uiduser : any;
  uid : any;
  uidnew : any;
  email : any;
  creationTime : any;
  lastSign : any;
  plantys : any;
  constructor(private AFauth : AngularFireAuth, private AFD : AngularFireDatabase) {
    AFauth.authState.subscribe(user=>{
      this.uid = user['_delegate']['uid'];
      this.email = user['_delegate']['email'];
      this.creationTime = user['_delegate']['metadata']['creationTime'];
      this.lastSign = user['_delegate']['metadata']['lastSignInTime'];
      this.AFD.database.ref('/Users/' + this.uid).once('value', (snapshot)=> {
        this.plantys = snapshot.val();
      });
    })
  }

  /*login(email:string, password:string){
    return this.AFauth.signInWithEmailAndPassword(email, password);
  }
  login(email:string, password:string): Promise<firebase.auth.UserCredential> {
    return this.AFauth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.AFauth.signInWithEmailAndPassword(email, password);
    })
  }*/
  login(email: string, password: string) {
    return this.AFauth.setPersistence('local').then(() => {
      return this.AFauth.signInWithEmailAndPassword(email, password);
    });
  }
  
  logout(){
    return new Promise((resolve, rejected) =>{
      this.AFauth.signOut().then(res =>{
        resolve(res);
      }).catch(err => rejected(err))
    });
  }
  mailRecovery(mail : string){
    return new Promise((resolve, rejected) =>{
      this.AFauth.sendPasswordResetEmail(mail).then(res =>{
        resolve(res);
      }).catch(err => rejected(err))
    });
  }
  getUser(){
    return new Promise((resolve,rejected) =>{
      if(this.AFauth.currentUser){
        resolve(this.AFauth.currentUser);
      }
      else{
        rejected();
      }
    });
  }
  getUserString(){
    return this.uiduser;
  }
  getUID(){
    return this.uid;
  }
  signup(mail : string , pass : string){
    return new Promise((resolve, rejected) =>{
      this.AFauth.createUserWithEmailAndPassword(mail, pass).then(res =>{
        resolve(res);
      }).catch(err => rejected(err))
    });
  }
  
}
