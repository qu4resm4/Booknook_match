import { Injectable } from '@angular/core';

export interface Message {
  id: string;
  chatId: string;
  content: string; // Conteúdo da mensagem
  sender: string; // 'me' ou UID do remetente
  timestamp: string; // Data/hora da mensagem
  read?: boolean; // Indica se a mensagem foi lida
  fromName?: string; // Nome do remetente
  date?: string; // Data legível da mensagem
  subject?: string; // Assunto da mensagem (se aplicável)
}


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = []; // Simulação de banco de dados

  async getMessagesByChatId(chatId: string): Promise<Message[]> {
    // Retorna mensagens associadas ao ID do chat
    return this.messages.filter((msg) => msg.chatId === chatId);
  }

  async sendMessage(message: Message): Promise<void> {
    // Salva a mensagem na lista
    this.messages.push(message);
  }
}
