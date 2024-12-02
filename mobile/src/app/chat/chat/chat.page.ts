
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform, NavController, IonContent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessageService, Message } from '../../services/message/message.service';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment'; 
import { initializeApp } from 'firebase/app';

// Inicializa o Firebase com as configurações do environment
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore(app); // Obtém a instância do Firestore

export interface Chat {
  messages: [];
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false })
  content!: IonContent;

  public chatId!: string; // ID do chat
  public messages: Message[] = []; // Lista de mensagens
  public newMessage: string = ''; // Mensagem a ser enviada
  public currentUserId: string = ''; // Armazena o UID do usuário atual
  public otherUserId: string = "";

  public nameCurrentUser: string = '';
  public nameOtherUser: string = '';

  private messageService = inject(MessageService);

  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor(
    private navCtrl: NavController,
    private fire: AngularFirestore
  ) {}

  ngOnInit() {

    // Obter ID do chat pela rota
    this.chatId = this.activatedRoute.snapshot.paramMap.get('id') as string;

    // Obter o ID do usuário atual
    const user = getAuth().currentUser;
    if (user) {
      this.currentUserId = user.uid;
    }

    this.messageService.getUserName(this.currentUserId).then((username) => {
      this.nameCurrentUser = username || '';
    });
    var id_other = this.chatId.replace(this.currentUserId, '');
    id_other = id_other.replace('_', '')
    this.otherUserId = id_other;
    this.messageService.getUserName(id_other).then((username) => {
      this.nameOtherUser =  username || '';
    });;

    // Carregar mensagens para o chat
    this.loadMessages();
  }

  ngAfterViewChecked() {
    // A cada mudança na visualização, rola o conteúdo até o fundo
    this.content.scrollToBottom(); // O número 300 é o tempo de transição em ms
  }

  async loadMessages() {
    this.fire.collection('chats').doc(this.chatId)
      .snapshotChanges()
      .subscribe((changes) => {
        // Verifique se a 'changes' contém um único 'change'
        const data = changes.payload.data() as Chat;
  
        console.log("VERIFIANDO SE ALGO ESTÁ SENDO ERCEBIDO", data);
  
        if (data) {
          this.messages = data?.messages;
        }
      });
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

  redirecionarPerfilUsuario() {
    this.navCtrl.navigateForward('perfil-usuario', {
      queryParams: {
        uid: this.otherUserId // Passa o livro para a página de resenha
      }
    });
  }
}
