import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OptionsPage } from '../options/options.page';
@Component({
  selector: 'app-type',
  templateUrl: './type.page.html',
  styleUrls: ['./type.page.scss'],
})
export class TypePage implements OnInit {

  constructor(private router : Router, public modalController: ModalController) { }
  back(){
    this.router.navigate(['/home']);
  }
  
  next(){
    this.router.navigate(['/add/connection']);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: OptionsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
  ngOnInit() {
  }

}
