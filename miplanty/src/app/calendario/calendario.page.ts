import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../servicios/auth.service'

import { CalendarComponent } from 'ionic2-calendar';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';
import {ModalController} from '@ionic/angular';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  eventSource = [];
  vistaTitle:string;

  calendar = {
    mode:'month',
    currentDate: new Date()
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;


  constructor(private authService : AuthService, private modalCtrl:ModalController, public router : Router) { }

  backHome(){
    this.router.navigate(['/tabs/tabs/home']);
  }

  ngOnInit() {
  }

  nextCalend(){
    this.myCal.slideNext();
  }

  backCalend(){
    this.myCal.slidePrev();
  }

  tituloMeses(titulo){
    this.vistaTitle = titulo;
  }

  async newCalend(){
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'modal-calend', //modifical el modal
      backdropDismiss:false,
    });

    await modal.present();

    modal.onDidDismiss().then((resultado) => {
      if (resultado.data && resultado.data.event) {
        let event =resultado.data.event;
        if(event.allDay){
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
        }
        this.eventSource.push(resultado.data.event);
        this.myCal.loadEvents();
      }
    });
  }
  }
