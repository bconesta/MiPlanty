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

  /*
  getData(){
    this.reference=firebase.database().ref(/Prueba)
    this.
  }
  */
  back(){
    this.router.navigate(['/'])
  }

  //LECTURA RUTAS
  getRutaUser(){
    this.db.database.ref('/Users').on('value', (snapshot)=>{
     this.rutausuario = snapshot.val();
     console.log(this.rutausuario)
    })
  }

  //TEST LEER DATOS
  getData(){
    this.db.database.ref('/Users/9BkSKMNQu3d8curVqKa97bikVlt1/hum').on('value', (snapshot)=> {
      const data = snapshot.val();
      (document.getElementById("humedad") as any).value = data;
      (document.getElementById("humedadtext")).innerHTML = data + '%';
    });
  }
  /*
  getData(){
    this.db.database.ref('/Users/' + (this.rutausuario) + '/hum').on('value', (snapshot)=> {
      const data = snapshot.val();
      (document.getElementById("humedad") as any).value = data;
      (document.getElementById("humedadtext")).innerHTML = data;
    });
    this.db.database.ref('/Users/' + this.rutausuario + '/luz').on('value', (snapshot)=> {
      const data = snapshot.val();
      (document.getElementById("luz") as any).value = data;
      (document.getElementById("luztext")).innerHTML = data;
    });
    this.db.database.ref('/Users/' + this.rutausuario + '/temp').on('value', (snapshot)=> {
      const data = snapshot.val();
      (document.getElementById("temperatura") as any).value = data;
      (document.getElementById("temperaturatext")).innerHTML = data;
    });
  }
  */
  new(){
    this.router.navigate(['/tabs/tabs/tab2'])
  }

  changeImgD(){
    if(this.imgcentro=='../../assets/imgs/phomeCENTRAL.png')
    {
      this.imgcentro='../../assets/imgs/phomeCACTUS.png';
      this.textplanta = 'CACTUS';
    }
    else if (this.imgcentro=='../../assets/imgs/phomeCACTUS.png')
    {
      this.imgcentro='../../assets/imgs/phomeLUZ.png';
      this.textplanta='DE LUZ';
    }
    else if (this.imgcentro=='../../assets/imgs/phomeLUZ.png')
    {
      this.imgcentro='../../assets/imgs/phomeSOMBRA.png';
      this.textplanta='DE SOMBRA';
    }
    else 
    {
      this.imgcentro='../../assets/imgs/phomeCENTRAL.png';
      this.textplanta='PLANTA';
    }
  }

  changeImgI(){
    if(this.imgcentro=='../../assets/imgs/phomeCENTRAL.png')
    {
      this.imgcentro='../../assets/imgs/phomeSOMBRA.png';
      this.textplanta='DE SOMBRA';
    }
    else if (this.imgcentro=='../../assets/imgs/phomeSOMBRA.png')
    {
      this.imgcentro='../../assets/imgs/phomeLUZ.png';
      this.textplanta='DE LUZ';
    }
    else if (this.imgcentro=='../../assets/imgs/phomeLUZ.png')
    {
      this.imgcentro='../../assets/imgs/phomeCACTUS.png';
      this.textplanta = 'CACTUS';
    }
    else 
    {
      this.imgcentro='../../assets/imgs/phomeCENTRAL.png';
      this.textplanta='PLANTA';
    }
  }
  
  ngOnInit() {
  }

}
