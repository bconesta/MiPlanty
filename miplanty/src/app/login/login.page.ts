import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
var idbt = "nada";
var estcon = false;
var hay = 0;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  user : string;
  password : string;
  constructor(private authService : AuthService, public router : Router, private bt : BluetoothSerial) { }

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
    /*this.authService.login(this.user, this.password).then(res =>{
      this.router.navigate(['/tabs/tabs/tab1']);
    }).catch(err => alert('Los datos son incorrectos'))
    */
    this.bt.isConnected().then(function(){
      estcon = true;
    }, function(){estcon=false;});

    if(estcon == false){
      this.bt.list().then(function(devices){
        devices.forEach(function(device){
          if(device.name == "ESP32prueba"){
            idbt = device.id;
          }
        })
      });
      if(idbt != "nada"){
        this.bt.connect(idbt);
      }
    }
    else{
      this.bt.available().then(function (num){
         hay = num;  
      }, function(){
        console.log("Error en la conexión")
      });
      
      
      if(hay > 0){
        this.bt.read().then(function (data){
          document.getElementById('texto').innerHTML = data;
        }, function(){console.log("Error");});
      }
    }
    

    

    

    }

  ngOnInit() {
  }

}
