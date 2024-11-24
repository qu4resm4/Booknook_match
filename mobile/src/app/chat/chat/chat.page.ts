import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MessageService, Message } from '../../services/message/message.service';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment'; 
import { initializeApp } from 'firebase/app';

// Inicializa o Firebase com as configurações do environment
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore(app); // Obtém a instância do Firestore

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public chatId!: string; // ID do chat
  public messages: Message[] = []; // Lista de mensagens
  public newMessage: string = ''; // Mensagem a ser enviada
  public currentUserId: string = ''; // Armazena o UID do usuário atual

  private messageService = inject(MessageService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {}

  ngOnInit() {
    // Obter ID do chat pela rota
    this.chatId = this.activatedRoute.snapshot.paramMap.get('id') as string;

    // Obter o ID do usuário atual
    const user = getAuth().currentUser;
    if (user) {
      this.currentUserId = user.uid;
    }

    // Carregar mensagens para o chat
    this.loadMessages();
  }

  async loadMessages() {
    // Carrega mensagens do serviço
    this.messages = await this.messageService.getMessagesByChatId(this.chatId);
  
    // Atribui o nome do remetente às mensagens (caso esteja disponível)
    for (const message of this.messages) {
      if (message.sender !== this.currentUserId) {  // Verifica se não é a mensagem do usuário atual
        const userRef = doc(firestore, `users/${message.sender}`);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          message.fromName = userSnap.data()['username'];  // Alterado para acessar 'username'
        }
      }
    }
  }

  async sendMessage() {
    if (this.newMessage.trim() === '') return;

    // Criar a mensagem
    const message: Message = {
      id: Date.now().toString(), // Gera um ID único para a mensagem
      chatId: this.chatId,
      content: this.newMessage,
      sender: this.currentUserId, // Usar o UID do usuário logado como remetente
      timestamp: new Date().toISOString(),
    };

    // Enviar mensagem para o serviço
    await this.messageService.sendMessage(message);

    // Atualizar a lista de mensagens localmente
    this.messages.push(message);

    // Limpar o campo de mensagem
    this.newMessage = '';
  }

  getBackButtonText() {
    return this.platform.is('ios') ? 'Inbox' : '';
  }
}
