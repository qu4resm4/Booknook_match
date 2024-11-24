import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth/auth.service';

interface User {
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

  constructor() {}

  async ionViewWillEnter() {
    const userId = await this.authService.getCurrentUserId();

    if (userId) {
      this.firestore
        .collection('chats', (ref) => ref.where('users', 'array-contains', userId))
        .valueChanges()
        .subscribe(async (chats: any[]) => {
          this.chats = await Promise.all(
            chats.map(async (chat) => {
              // Buscar os nomes dos usuários do chat
              const userNames = await Promise.all(
                chat.users.map(async (userId: string) => {
                  const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();

                  // Verifica se userDoc é válido e existe
                  if (userDoc && userDoc.exists) {
                    const userData = userDoc.data() as User;
                    return userData.username; // Pega o 'username'
                  } else {
                    return 'Usuário desconhecido'; // Caso o documento não exista
                  }
                })
              );
              return {
                id: chat.id,
                users: userNames, // Agora users é uma lista de usernames
                lastMessage: chat.messages?.slice(-1)[0] || null, // Pega a última mensagem
              };
            })
          );
        });
    }
  }

  // Função para gerar a mensagem personalizada de match
  getMatchMessage(users: string[]): string {
    if (users.length === 2) {
      return `${users[0]}, você formou um match com ${users[1]}!`;
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
