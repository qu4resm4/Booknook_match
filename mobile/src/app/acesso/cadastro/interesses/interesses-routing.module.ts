import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { InteressesPage } from './interesses.page';

const routes: Routes = [
  {
    path: '',
    component: InteressesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    AngularFireAuthModule,
  ],
  exports: [RouterModule],
})
export class InteressesPageRoutingModule {}
