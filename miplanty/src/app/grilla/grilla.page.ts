import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.page.html',
  styleUrls: ['./grilla.page.scss'],
})
export class GrillaPage implements OnInit {

  constructor(
    private authService : AuthService,
    public router : Router,
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

ngAfterViewInit(){
  this.db.database.ref('/Users/' + this.authService.uid + '/Plantas/').on('value', (snapshot)=> {
    this.lectura = snapshot.val();
  })
  var d1 = this.elementRef.nativeElement.querySelector('.one');
  d1.insertAdjacentHTML ('beforeend', '<ion-col><ion-card><img src="../../assets/imgs/phomeCENTRAL.png"><ion-card-header><ion-card-title class="titulo-card"><label>' + this.lectura + '</label></ion-card-title></ion-card-header></ion-card></ion-col>');
}

    getGrilla(){
      this.nombre = Object.entries(this.plantys)[this.selector][0];

      this.nombregrilla = this.nombre;
    }

    ionViewDidEnter(){
      this.db.database.ref('/Users/' + this.authService.uid + '/Plantas/').on('value', (snapshot)=> {
        this.plantys = snapshot.val();
        this.getGrilla();
      });
    }

  ngOnInit() {
  }

}
