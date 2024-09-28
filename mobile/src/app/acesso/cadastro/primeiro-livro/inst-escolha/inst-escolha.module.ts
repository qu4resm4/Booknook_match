import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstEscolhaPageRoutingModule } from './inst-escolha-routing.module';

import { InstEscolhaPage } from './inst-escolha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstEscolhaPageRoutingModule
  ],
  declarations: [InstEscolhaPage]
})
export class InstEscolhaPageModule {}
