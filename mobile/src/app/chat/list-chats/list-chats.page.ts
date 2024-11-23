import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth/auth.service';

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
        .subscribe((chats: any[]) => {
          this.chats = chats.map((chat) => ({
            id: chat.id,
            users: chat.users,
            lastMessage: chat.messages?.slice(-1)[0] || null, // Pega a última mensagem
          }));
        });
    }
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
