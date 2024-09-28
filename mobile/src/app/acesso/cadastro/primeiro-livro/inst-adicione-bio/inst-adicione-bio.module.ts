import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstAdicioneBioPageRoutingModule } from './inst-adicione-bio-routing.module';

import { InstAdicioneBioPage } from './inst-adicione-bio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstAdicioneBioPageRoutingModule
  ],
  declarations: [InstAdicioneBioPage]
})
export class InstAdicioneBioPageModule {}
