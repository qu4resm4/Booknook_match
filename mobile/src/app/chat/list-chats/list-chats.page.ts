import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth/auth.service';

interface User {
  uid: string;

  username: string;
}

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.page.html',
  styleUrls: ['./list-chats.page.scss'],
})
export class ListChatsPage {
  private firestore = inject(AngularFirestore);
  private authService = inject(AuthService);
  public chats: any[] = [];
  public matchMessages: string[] = []; // Adicionando a variável para armazenar mensagens de match
  private userCache: { [uid: string]: User } = {}; // Cache para armazenar os usernames
  public userUid: string | null = null;

  constructor() {}

  ionViewWillEnter() {
    // Inicializa o UID do usuário
    this.authService.getCurrentUserId().then(uid => {
      this.userUid = uid;
      if (uid) {
        this.loadChats();
      }
    });
  }

  loadChats() {
    this.firestore
      .collection('chats', (ref) => ref.where('users', 'array-contains', this.userUid))
      .snapshotChanges()
      .subscribe(async (chats: any[]) => {
        this.matchMessages = []; // Limpa mensagens de match para evitar duplicatas
  
        this.chats = await Promise.all(
          chats.map(async (chat) => {
            const chatData = chat.payload.doc.data();
            const users = await this.getUserDetails(chatData.users);
  
            // Obtém a última mensagem
            const lastMessage = chatData.messages?.slice(-1)[0] || null;
  
            if (!lastMessage) {
              // Adiciona mensagem de match apenas se não houver mensagens
              const matchMessage = await this.getMatchMessage(users);
              this.matchMessages.push(matchMessage);
            } else {
              // Adiciona prévia da última mensagem ao preview
              const senderName = users.find(user => user.uid === lastMessage.sender)?.username || 'Desconhecido';
              const messagePreview = lastMessage.sender === this.userUid ? `Você: ${lastMessage.content}` : `${senderName}: ${lastMessage.content}`;
              this.matchMessages.push(messagePreview);
            }
  
            return {
              id: chat.payload.doc.id,
              users, // Lista de usernames
              lastMessage, // Última mensagem
            };
          })
        );
      });
  }
  
  // Função para buscar os usernames dos usuários
  async getUserDetails(userUids: string[]): Promise<User[]> {
    const userDetails: User[] = [];
    for (const uid of userUids) {
      if (!this.userCache[uid]) {
        // Busca no Firestore se não estiver no cache
        const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
        if (userDoc?.exists) {
          const userData = userDoc.data() as User;
          this.userCache[uid] = { uid, username: userData.username };
        }
      }
      userDetails.push(this.userCache[uid]);
    }
    return userDetails;
  }

  // Função para gerar a mensagem personalizada de match
  async getMatchMessage(users: User[]): Promise<string> {
    if (users.length === 2 && this.userUid) {
      const otherUser = users.find(user => user.uid !== this.userUid);  
      if (otherUser) {
        return `Você formou um match com ${otherUser.username}!`;
      }

    }
    return 'Match com mais usuários';
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();

    }, 1000);

  }

  getChatList() {
    return this.chats;
  }
}
