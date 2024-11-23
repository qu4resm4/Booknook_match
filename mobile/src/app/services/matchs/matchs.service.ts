import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable, switchMap } from 'rxjs';
import { Perfil } from 'src/app/models/perfil.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MatchsService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService) { }

  async likeUser(targetUserId: string) {
    let currentUserId: string = await this.auth.getCurrentUserId();
  
    if (!currentUserId) return;
  
    // Referências aos documentos dos usuários
    const currentUserRef = this.firestore.collection('users').doc(currentUserId);
    const targetUserRef = this.firestore.collection('users').doc(targetUserId);
  
    // Transação para evitar inconsistências
    this.firestore.firestore.runTransaction(async (transaction) => {
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
          matches: [...((currentUserDoc.data() as Perfil)?.matches || []), targetUserId],
        });
        transaction.update(targetUserRef.ref, {
          matches: [...((targetUserDoc.data() as Perfil)?.matches || []), currentUserId],
        });
      }
    });
  }
  
}
