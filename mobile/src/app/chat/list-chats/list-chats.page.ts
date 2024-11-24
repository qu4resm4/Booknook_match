import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth/auth.service';

interface User {
  uid: string; // Alterado para usar "uid"
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
  private userCache: { [uid: string]: User } = {}; // Cache para armazenar os usernames

  constructor() {}

  async ionViewWillEnter() {
    const userUid = await this.authService.getCurrentUserId();

    if (userUid) {
      this.firestore
        .collection('chats', (ref) => ref.where('users', 'array-contains', userUid))
        .valueChanges()
        .subscribe(async (chats: any[]) => {
          // Mapeia e busca os dados dos usuários
          this.chats = await Promise.all(
            chats.map(async (chat) => {
              const users = await this.getUserDetails(chat.users); // Busca os usernames
              return {
                id: chat.id,
                users, // Lista de usernames ao invés de UIDs
                lastMessage: chat.messages?.slice(-1)[0] || null,
              };
            })
          );
        });
    }
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
  getMatchMessage(users: User[]): string {
    if (users.length === 2) {
      return `${users[0].username}, você formou um match com ${users[1].username}!`;
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
