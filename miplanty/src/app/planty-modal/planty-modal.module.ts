import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantyModalPageRoutingModule } from './planty-modal-routing.module';

import { PlantyModalPage } from './planty-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantyModalPageRoutingModule
  ],
  declarations: [PlantyModalPage]
})
export class PlantyModalPageModule {}
