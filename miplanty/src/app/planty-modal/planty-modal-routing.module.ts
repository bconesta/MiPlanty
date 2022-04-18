import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantyModalPage } from './planty-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PlantyModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantyModalPageRoutingModule {}
