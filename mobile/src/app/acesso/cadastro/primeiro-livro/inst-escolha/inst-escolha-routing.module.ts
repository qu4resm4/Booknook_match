import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstEscolhaPage } from './inst-escolha.page';

const routes: Routes = [
  {
    path: '',
    component: InstEscolhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstEscolhaPageRoutingModule {}
