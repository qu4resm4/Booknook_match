import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { ItemChatComponent } from '../item-chat/item-chat.component';

import { MessageService, Message } from '../../services/message/message.service';

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.page.html',
  styleUrls: ['./list-chats.page.scss'],
})

export class ListChatsPage {
  private data = inject(MessageService);
  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
}