import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InteressesPageRoutingModule } from './interesses-routing.module';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { InteressesPage } from './interesses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFirestoreModule,
    InteressesPageRoutingModule
  ],
  declarations: [InteressesPage]
})
export class InteressesPageModule {}
