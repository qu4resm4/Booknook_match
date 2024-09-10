import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InteressesPage } from './interesses.page';

const routes: Routes = [
  {
    path: '',
    component: InteressesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InteressesPageRoutingModule {}
