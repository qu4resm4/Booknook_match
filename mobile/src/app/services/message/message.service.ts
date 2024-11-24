import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc, arrayUnion, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Definindo a interface Message
export interface Message {
  id: string;
  chatId: string;
  content: string;
  sender: string;
  timestamp: string;
  read?: boolean; // Propriedade para indicar se a mensagem foi lida
  fromName?: string; // Propriedade para o nome do remetente
  date?: string; // Propriedade para a data da mensagem
  subject?: string; // Propriedade para o assunto da mensagem
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private firestore: Firestore;

  constructor() {
    // Inicializa o Firestore
    this.firestore = getFirestore();
  }

  async getMessagesByChatId(chatId: string): Promise<Message[]> {
    const chatRef = doc(this.firestore, `chats/${chatId}`);
    const chatSnap = await getDoc(chatRef);

    if (chatSnap.exists()) {
      const chatData = chatSnap.data();
      // Acesso à propriedade 'messages' usando notação de colchetes
      return chatData?.['messages'] || [];
    }
    return [];
  }

  async sendMessage(message: Message): Promise<void> {
    const chatRef = doc(this.firestore, `chats/${message.chatId}`);
    const chatSnap = await getDoc(chatRef);

    if (chatSnap.exists()) {
      // Atualiza a conversa com a nova mensagem
      await updateDoc(chatRef, {
        messages: arrayUnion(message),
      });
    } else {
      // Se o chat não existir, cria um novo
      await setDoc(chatRef, {
        createdAt: new Date().toISOString(),
        id: message.chatId,
        users: [message.sender], // Adiciona o remetente ao campo users
        messages: [message],
      });
    }
  }
}
