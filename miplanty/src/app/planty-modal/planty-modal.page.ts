import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-planty-modal',
  templateUrl: './planty-modal.page.html',
  styleUrls: ['./planty-modal.page.scss'],
})
export class PlantyModalPage implements OnInit {
  @Input() obj : any;
  ruta : string = "../../assets/imgs/phomeCENTRAL.png";
  tipo : string;
  hum : string;
  luz : string;
  temp : string;
  constructor(public modalController : ModalController) { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
    console.log(this.obj);
    this.tipo = "Tipo: " + this.obj[1].tipo;
    this.ruta = this.obj[1].tipo === "Cactus" ? "../../assets/imgs/phomeCACTUS.png" : "../../assets/imgs/phomeCENTRAL.png";
    this.hum = "Humedad: " + this.obj[1].hum.toFixed(1) + "%";
    this.luz = "Luz: " + this.obj[1].luz.toFixed(1) + "%";
    this.temp = "Temperatura: " + this.obj[1].temp.toFixed(0) + "°C";
  }

}
