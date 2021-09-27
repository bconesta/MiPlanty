import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PassDataService } from 'src/app/servicios/pass-data.service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AuthService } from 'src/app/servicios/auth.service';

var found = false;
var mac = "-"
var uid = "-";
@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage implements OnInit {
  obje : any;
  name : string;
  type : string;
  SSID : string;
  pass : string;
  primera : boolean = false;
  constructor(private authService : AuthService, private SerialBT : BluetoothSerial, private openNativeSettings: OpenNativeSettings, private router : Router, private passData : PassDataService) { 
    
  }
  back(){
    this.router.navigate(['/add/type']);
  }
  lol(){
    this.router.navigate(['/home']);
    //this.obje = this.passData.getData();
    //console.log(this.obje['type'])
  }
  opbt(){
    this.openNativeSettings.open("bluetooth");
  }
  next(){
    this.SerialBT.list().then(function(devices) {
      devices.forEach(function(device) {
        if(device.name == "MiPlanty"){
          found = true;
          mac = device.id;
        }
      })
    });
    if(found == true){
      this.SerialBT.connect(mac);
      this.SerialBT.write("SSID");
      alert("CONECTADOOO")
      
    }
    else{alert("No encontrado")}
    (document.getElementById("textoo") as any).style = "display: none;";
    (document.getElementById("seg") as any).style = "display: block;";
  }

  sendSSID(){
    
    if(this.primera == false){
      this.SerialBT.write(this.SSID);
      this.primera=true
    }
    else{
      this.SerialBT.write("PASS");
      (document.getElementById("seg") as any).style = "display: none;";
      (document.getElementById("ter") as any).style = "display: block;";
      this.primera = false;
    }

  }
  sendPASS(){
    if(this.primera == false){
      this.SerialBT.write(this.pass);
      this.primera=true
    }
    else{
      this.authService.getUser().then(function(data){uid = data['_delegate']['uid']; console.log(data['_delegate']['uid']);});
      this.SerialBT.write(uid.toString);
      alert(uid.toString);
      (document.getElementById("seg") as any).style = "display: none;";
      (document.getElementById("ter") as any).style = "display: none;";
    }
    
  }

  ngOnInit() {
  }

}
