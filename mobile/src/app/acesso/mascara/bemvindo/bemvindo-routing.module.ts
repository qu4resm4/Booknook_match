import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BemvindoPage } from './bemvindo.page';

const routes: Routes = [
  {
    path: '',
    component: BemvindoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BemvindoPageRoutingModule {}
