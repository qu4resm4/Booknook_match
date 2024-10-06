import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstAdicioneBioPage } from './inst-adicione-bio.page';

const routes: Routes = [
  {
    path: '',
    component: InstAdicioneBioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstAdicioneBioPageRoutingModule {}
