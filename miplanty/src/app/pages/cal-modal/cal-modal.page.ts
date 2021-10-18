import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements AfterViewInit {

  calendar = {
    mode:'month',
    currentDate: new Date()
  };
  vistaTitle: string;

  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  };

  modalReady = false; //para que se vea bien el modal
  
  constructor(private modalCtrl:ModalController) { }

/*  ngOnInit() {
  }
*/
  ngAfterViewInit(){
    setTimeout(() => {
      this.modalReady = true;
    },0);
  }

  guardar(){
    this.modalCtrl.dismiss ({event: this.event})
  }

  tituloMeses(title){
    this.vistaTitle = title;
  }

  tiempoElegido(ev){
    console.log ('ev:', ev);
    this.event.startTime = new Date(ev.selectedTime);
  }

  volverModal(){
    this.modalCtrl.dismiss();
  }

}
