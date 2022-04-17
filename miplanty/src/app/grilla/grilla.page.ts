import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';
import { PlantyModalPage } from '../planty-modal/planty-modal.page';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.page.html',
  styleUrls: ['./grilla.page.scss'],
})
export class GrillaPage implements OnInit {
  modal: HTMLElement;
  constructor(
    private authService : AuthService,
    public router : Router,
    public onValue : AngularFireDatabase,
    public db:AngularFireDatabase,
    public modalController : ModalController) { 
    }

    plantys : any = Object.entries(this.authService.plantys);
    cantidad : number;
    selector : number = 0;
  
    nombre : string = "Planta";
    tipo : string;
    hum : any;
    luz: any;
    temp : any;
    lectura : any;

    public nombregrilla = "PlantaX";

    async presentModal(planty : any) {
      console.log(planty);
      const modal = await this.modalController.create({
        component: PlantyModalPage,
        cssClass: 'my-custom-class',
        componentProps: {'obj' : planty}
      });
      return await modal.present();
    }

    card(lol : any){
      console.log(lol);
    }

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


ionViewDidEnter(){
  /*this.db.database.ref('/Users/' + this.authService.uid).on('value', (snapshot)=> {
  
    this.lectura = snapshot.val();
    //this.cantidad = Object.entries(this.lectura).length;
    //this.nombre = Object.entries(this.lectura)[this.selector][0];
    console.log('la lecrua es:' + this.lectura);
  }) */


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
