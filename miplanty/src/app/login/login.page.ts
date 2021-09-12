import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  user : string;
  password : string;
  constructor(private authService : AuthService, public router : Router, private bt : BluetoothSerial) { 
    if(this.authService.getUser()){console.log(this.authService.getUser())}
  }

  showPass(){
    console.log(this.user);
    console.log(this.password);
    let pass :any = document.getElementById('passId');
    let icon :any = document.getElementById('seeIcon');
    if(pass.type == "password"){
      pass.type = "text";
      icon.name = "eye-off-outline";
    }
    else{
      pass.type = "password";
      icon.name = "eye-outline";
    }
  }

  log_in(){
    this.authService.login(this.user, this.password).then(res =>{
      this.router.navigate(['/tabs/tabs/tab1']);
    }).catch(err => alert('Los datos son incorrectos'))
    
    }
    forpass(){
      this.router.navigate(['/forgotten-password']);
    }

  ngOnInit() {
  }

}
