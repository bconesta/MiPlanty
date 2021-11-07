import { Component, OnInit } from '@angular/core';
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
    public db:AngularFireDatabase) { 
      
    }

    plantys : any;
    cantidad : number;
    selector : number = 0;
  
    nombre : string;
    tipo : string;
    hum : any;
    luz: any;
    temp : any;

    public nombregrilla = "PlantaX";

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
