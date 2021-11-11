import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import {onValue} from 'firebase/database'
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.page.html',
  styleUrls: ['./grilla.page.scss'],
})
export class GrillaPage implements OnInit {

  constructor(
    private authService : AuthService,
    public router : Router,
    public onValue : AngularFireDatabase,
    public db:AngularFireDatabase,
    private elementRef: ElementRef) { 
      
    }

    plantys : any;
    cantidad : number;
    selector : number = 0;
  
    nombre : string;
    tipo : string;
    hum : any;
    luz: any;
    temp : any;
    lectura : any;

    public nombregrilla = "PlantaX";

/*
    getCards(){
      this.cantidad = Object.entries(this.plantys).length;
      this.nombre = Object.entries(this.plantys)[this.selector][0];
      this.nombregrilla = this.nombre;
      console.log(this.nombregrilla);
      var d1 = this.elementRef.nativeElement.querySelector('.one');
  d1.insertAdjacentHTML ('beforeend', '<ion-col><ion-card><img src="../../assets/imgs/phomeCENTRAL.png"><ion-card-header><ion-card-title class="titulo-card"><label>' + this.nombre + '</label></ion-card-title></ion-card-header></ion-card></ion-col>');

    }

    ionViewDidEnter(){
      this.db.database.ref('/Users/' + this.authService.uid).on('value', (snapshot)=> {
        this.plantys = snapshot.child('Plantas').val();
        console.log(this.plantys);
        this.getCards();
      });
    }
*/


ngAfterViewInit(){
  this.db.database.ref('/Users/').on('value', (snapshot)=> {
    this.lectura = snapshot.val();
    console.log ('prueba2:' + this.lectura);
  })
  this.db.database.ref('/Users/ ' + this.authService.uid + '/Plantas/').on('value', (snapshot)=> {
  
    this.lectura = snapshot.val();
    //this.cantidad = Object.entries(this.lectura).length;
    //this.nombre = Object.entries(this.lectura)[this.selector][0];
    console.log('la lecrua es:' + this.lectura);
  })

  var d1 = this.elementRef.nativeElement.querySelector('.one');
  d1.insertAdjacentHTML ('beforeend', '<ion-col><ion-card><img src="../../assets/imgs/phomeCENTRAL.png"><ion-card-header><ion-card-title class="titulo-card"><label>' + this.nombre + '</label></ion-card-title></ion-card-header></ion-card></ion-col>');
}

/*
  ngAfterViewInit(){
  onValue(this.db.database.ref( '/Users/ ' + this.authService.uid + '/Plantas/'), (snapshot)=>
  {
    console.log(snapshot.val());

  })
    */



  ngOnInit() {
  }

}
