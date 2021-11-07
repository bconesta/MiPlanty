import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {

  constructor(
    private authService : AuthService,
    public router : Router,
    public db:AngularFireDatabase) { 
      
    }

  public imgcentro = '../../assets/imgs/phomeCENTRAL.png';
  public textplanta = "PLANTA";
  public rutausuario = '';
  plantys : any;
  cantidad : number;
  selector : number = 0;

  nombre : string;
  tipo : string;
  hum : any;
  luz: any;
  temp : any;

  /*
  getData(){
    this.reference=firebase.database().ref(/Prueba)
    this.
  }
  */
  back(){
    this.authService.logout().then(res =>{
      this.router.navigate(['/']);
    }).catch(err => alert('Los datos son incorrectos'))

  }

  //LECTURA RUTAS
  getRutaUser(){
    this.db.database.ref('/Users').on('value', (snapshot)=>{
     this.rutausuario = snapshot.val();
     console.log(this.rutausuario)
    })
  }

  //TEST LEER DATOS
  /*getData(){
    this.db.database.ref('/Users/9BkSKMNQu3d8curVqKa97bikVlt1/').on('value', (snapshot)=> {
      this.plantys = snapshot.val();
      this.getPlantys();
    });
  }*/
  
  new(){
    this.router.navigate(['/add/type'])
  }


  getPlantys(){
    this.cantidad = Object.entries(this.plantys).length;
    this.nombre = Object.entries(this.plantys)[this.selector][0];
    
    this.hum = Object.entries(this.plantys)[this.selector][1]['hum'];
    document.getElementById("humedadtext").innerHTML = (this.hum * 100) + "%";
    (document.getElementById("humedad") as any).value  = this.hum;
    (document.getElementById("icono_agua") as any).style = "left:" + (60*this.hum+5) + "%;";

    this.luz = Object.entries(this.plantys)[this.selector][1]['luz'];
    document.getElementById("luztext").innerHTML = (this.luz * 100) + "%";
    (document.getElementById("luz") as any).value  = this.luz;
    (document.getElementById("icono_sol") as any).style = "left:" + (60*this.luz+5) + "%;";

    this.temp = Object.entries(this.plantys)[this.selector][1]['temp'];
    document.getElementById("temperaturatext").innerHTML = (this.temp * 100) + "%";
    (document.getElementById("temperatura") as any).value  = this.temp;
    (document.getElementById("icono_temp") as any).style = "left:" + (60*this.temp+5) + "%;";

    this.textplanta = this.nombre;
  }




  changeImgD(){
    this.selector = this.selector+1;
    if(this.selector>(this.cantidad-1)){
      this.selector=0;
    }
    this.getPlantys();
  }

  changeImgI(){
    this.selector = this.selector-1;
    if(this.selector<0){
      this.selector=this.cantidad-1;
    }
    this.getPlantys();
  }
  
  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.db.database.ref('/Users/' + this.authService.uid + '/Plantas/').on('value', (snapshot)=> {
      this.plantys = snapshot.val();
      this.getPlantys();
    });
  }
}
