import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { Perfil } from 'src/app/models/perfil.model';

@Injectable({
  providedIn: 'root',
})
export class MatchsService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService
  ) {}

  async likeUser(targetUserId: string): Promise<void> {
    const currentUserId: string = await this.auth.getCurrentUserId();

    if (!currentUserId) return;

    // Referências aos documentos dos usuários
    const currentUserRef = this.firestore.collection('users').doc(currentUserId);
    const targetUserRef = this.firestore.collection('users').doc(targetUserId);

    // Transação para evitar inconsistências
    try {
      await this.firestore.firestore.runTransaction(async (transaction) => {
        const currentUserDoc = await transaction.get(currentUserRef.ref);
        const targetUserDoc = await transaction.get(targetUserRef.ref);

        if (!currentUserDoc.exists || !targetUserDoc.exists) return;

        const currentUserLikes = (currentUserDoc.data() as Perfil)?.likes || [];
        const targetUserLikes = (targetUserDoc.data() as Perfil)?.likes || [];

        // Atualiza o campo "likes" do usuário autenticado
        transaction.update(currentUserRef.ref, {
          likes: [...currentUserLikes, targetUserId],
        });

        // Verifica se o outro usuário já deu "like" no autenticado
        if (targetUserLikes.includes(currentUserId)) {
          // Adiciona o match em ambos os usuários
          transaction.update(currentUserRef.ref, {
            matches: [...(currentUserDoc.data() as Perfil)?.matches || [], targetUserId],
          });
          transaction.update(targetUserRef.ref, {
            matches: [...(targetUserDoc.data() as Perfil)?.matches || [], currentUserId],
          });

          // Cria um chat se não existir
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
