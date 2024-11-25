import { Component, inject, OnInit } from '@angular/core';
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
export class ListChatsPage implements OnInit {
  private firestore = inject(AngularFirestore);
  private authService = inject(AuthService);
  public chats: any[] = [];
  public matchMessages: string[] = []; // Adicionando a variável para armazenar mensagens de match
  private userCache: { [uid: string]: User } = {}; // Cache para armazenar os usernames
  private userUid: string | null = null;

  constructor() {}

  ngOnInit() {
    // Inicializa o UID do usuário
    this.authService.getCurrentUserId().then(uid => {
      this.userUid = uid;
      if (uid) {
        this.loadChats();
      }
    });
  }

  // Função para carregar os chats
  loadChats() {
    // Usamos o `snapshotChanges()` para não ter problemas com assinaturas
    this.firestore
      .collection('chats', (ref) => ref.where('users', 'array-contains', this.userUid))
      .snapshotChanges()
      .subscribe(async (chats: any[]) => {
        // Mapeia e busca os dados dos usuários
        this.chats = await Promise.all(
          chats.map(async (chat) => {
            const users = await this.getUserDetails(chat.payload.doc.data().users); // Busca os usernames
            const matchMessage = await this.getMatchMessage(users); // Gerar a mensagem de match
            this.matchMessages.push(matchMessage); // Armazenar a mensagem de match
            return {
              id: chat.payload.doc.id,
              users, // Lista de usernames ao invés de UIDs
              lastMessage: chat.payload.doc.data().messages?.slice(-1)[0] || null,
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
