import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InteressesPageRoutingModule } from './interesses-routing.module';

import { InteressesPage } from './interesses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InteressesPageRoutingModule
  ],
  declarations: [InteressesPage]
})
export class InteressesPageModule {}
