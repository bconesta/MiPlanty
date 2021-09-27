import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OptionsPage } from '../options/options.page';
import { PassDataService } from 'src/app/servicios/pass-data.service';
@Component({
  selector: 'app-type',
  templateUrl: './type.page.html',
  styleUrls: ['./type.page.scss'],
})
export class TypePage implements OnInit {
  tipoplanta : string;
  name : string = "";

  constructor(
    private router : Router,
    public modalController: ModalController,
    private passData : PassDataService
    ) { }
  back(){
    this.router.navigate(['/home']);
  }
  
  next(){
    if(this.tipoplanta['type'] != "" && this.name != ""){
      this.passData.setData(this.name, this.tipoplanta['type']);
      this.router.navigate(['/add/connection']);
    }
    else{
      console.log("Faltan datos juju")
    }
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: OptionsPage,
      cssClass: 'my-custom-class'
    });
    
    modal.onDidDismiss().then((data) => {
      this.tipoplanta = data['data'];
      console.log(this.tipoplanta['type']);
      (document.getElementById('planttype') as any).value = this.tipoplanta['type'];
    });
    
    return await modal.present();
  }

  
  ngOnInit() {
  }

}
