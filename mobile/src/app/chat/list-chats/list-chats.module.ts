import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListChatsPageRoutingModule } from './list-chats-routing.module';

import { ListChatsPage } from './list-chats.page';
import { ItemChatComponent } from '../item-chat/item-chat.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListChatsPageRoutingModule
  ],
  declarations: [ListChatsPage,
    ItemChatComponent
  ]
})
export class ListChatsPageModule {}
