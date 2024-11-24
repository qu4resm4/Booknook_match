import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MatchsService {
  constructor(private firestore: AngularFirestore, private auth: AuthService) {}

  async likeUser(targetUserId: string): Promise<void> {
    try {
      const currentUserId = await this.auth.getCurrentUserId();
  
      if (!currentUserId) {
        console.error('Usuário atual não encontrado.');
        return;
      }
  
      const currentUserRef = this.firestore.collection('users').doc(currentUserId);
      const targetUserRef = this.firestore.collection('users').doc(targetUserId);
  
      await this.firestore.firestore.runTransaction(async (transaction) => {
        const currentUserDoc = await transaction.get(currentUserRef.ref);
        const targetUserDoc = await transaction.get(targetUserRef.ref);
  
        if (!currentUserDoc.exists || !targetUserDoc.exists) {
          console.error('Usuário(s) não encontrado(s).');
          return;
        }
  
        const currentUserLikes = (currentUserDoc.data() as any)?.likes || [];
        const targetUserLikes = (targetUserDoc.data() as any)?.likes || [];
  
        // Atualiza os "likes"
        transaction.update(currentUserRef.ref, {
          likes: [...currentUserLikes, targetUserId],
        });
  
        if (targetUserLikes.includes(currentUserId)) {
          // Cria match
          transaction.update(currentUserRef.ref, {
            matches: [...((currentUserDoc.data() as any)?.matches || []), targetUserId],
          });
          transaction.update(targetUserRef.ref, {
            matches: [...((targetUserDoc.data() as any)?.matches || []), currentUserId],
          });
  
          // Cria chat se não existir
          const chatId = this.generateChatId(currentUserId, targetUserId);
          const chatDoc = this.firestore.collection('chats').doc(chatId);
          const chatSnapshot = await chatDoc.get().toPromise();
  
          if (!chatSnapshot?.exists) {
            transaction.set(chatDoc.ref, {
              id: chatId,
              users: [currentUserId, targetUserId],
              messages: [],
              createdAt: new Date().toISOString(),
            });
          }
        }
      });
    } catch (error) {
      console.error('Erro ao processar o like:', error);
    }
  }
  

  private generateChatId(userId1: string, userId2: string): string {
    return [userId1, userId2].sort().join('_'); // Gera um ID único baseado nos usuários
  }
}
