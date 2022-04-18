import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../servicios/auth.service';
import { LanguageService } from '../servicios/language.service';
@Component({
  selector: 'app-planty-modal',
  templateUrl: './planty-modal.page.html',
  styleUrls: ['./planty-modal.page.scss'],
})
export class PlantyModalPage implements OnInit {
  @Input() obj : any;
  titulo : string;
  ruta : string = "../../assets/imgs/phomeCENTRAL.png";
  tipo : string;
  hum : string;
  luz : string;
  temp : string;
  constructor(public modalController : ModalController,
    public db : AngularFireDatabase,
    public auth : AuthService,
    public leng : LanguageService) { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
    
  }

  delete(){
    this.db.database.ref('Users/' + this.auth.uid + '/' + this.obj[0]).remove();
    this.dismiss();
  }

  ngOnInit() {
    this.titulo = this.leng.language[this.leng.value].PlantyModalPage.titulo;
    this.tipo = this.leng.language[this.leng.value].PlantyModalPage.label1 + this.obj[1].tipo;
    this.ruta = this.obj[1].tipo === "Cactus" ? "../../assets/imgs/phomeCACTUS.png" : "../../assets/imgs/phomeCENTRAL.png";
    this.hum = this.leng.language[this.leng.value].PlantyModalPage.label2 + this.obj[1].hum.toFixed(1) + "%";
    this.luz = this.leng.language[this.leng.value].PlantyModalPage.label3 + this.obj[1].luz.toFixed(1) + "%";
    this.temp = this.leng.language[this.leng.value].PlantyModalPage.label4 + this.obj[1].temp.toFixed(0) + "°C";
  }

}
