import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ChatPerilService } from 'src/app/services/chat-perfil/chat-peril.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public messages: any[] = [];
  private chatService = inject(ChatPerilService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {}

  ngOnInit() {
    const chatId = this.activatedRoute.snapshot.paramMap.get('uid') as string;

    // Busca as mensagens do chat
    this.chatService.getChat(chatId).subscribe((chatData) => {
      if (chatData?.messages && chatData.messages.length > 0) {
        this.messages = chatData.messages; // Carrega apenas mensagens reais
      } else {
        this.messages = []; // Certifica-se de que nenhuma mensagem fictícia seja exibida
      }
    });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }
}
