import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BemvindoPageRoutingModule } from './bemvindo-routing.module';

import { BemvindoPage } from './bemvindo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BemvindoPageRoutingModule
  ],
  declarations: [BemvindoPage]
})
export class BemvindoPageModule {}
