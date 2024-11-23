import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable, switchMap } from 'rxjs';
import { Perfil } from 'src/app/models/perfil.model';
import { getFirestore, arrayUnion, doc, updateDoc } from 'firebase/firestore'; // Importação corrigida para Firebase v9+
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private lastDocument: QueryDocumentSnapshot<any> | null = null;

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService
  ) {}

  // Atualiza o perfil do usuário no Firestore
  updatePerfil(perfil: Perfil): Promise<void> {
    const userId = perfil.id_usuario;
    if (!userId) {
      throw new Error('ID de usuário não encontrado');
    }

    const userRef = this.firestore.collection('users').doc(userId);

    return userRef.update({
      biografia: perfil.biografia || '', // Garante que a biografia seja uma string
      interesses_usuario: perfil.interesses_usuario,
      resenhas: arrayUnion(...perfil.resenhas), // Correção para usar arrayUnion corretamente
    }).catch((error) => {
      console.error('Erro ao atualizar perfil: ', error);
      throw new Error('Erro ao atualizar perfil');
    });
  }

  // Adiciona uma resenha para o usuário
  addResenhaUsuario(userId: string, resenha: any): Promise<void> {
    const userRef = this.firestore.collection('users').doc(userId).collection('resenhas');
    return userRef.add(resenha)
      .then(() => {
        console.log('Resenha adicionada com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao adicionar resenha: ', error);
        throw new Error('Erro ao adicionar resenha');
      });
  }

  getPerfil(uid: string): Observable<Perfil | undefined> {
    return this.firestore.collection('users').doc<Perfil>(uid).valueChanges();
  }

  getUsers(limit: number): Observable<Perfil[]> {
    return new Observable<Perfil[]>((observer) => {
      (async () => {
        try {
          // Obtém o UID do usuário autenticado
          const uidUserCurrent = await this.auth.getCurrentUserId();
          if (!uidUserCurrent) {
            observer.next([]); // Se não houver usuário autenticado, retorna lista vazia
            observer.complete();
            return;
          }
  
          // Referência ao documento do usuário autenticado
          const userDocRef = this.firestore.collection('users').doc(uidUserCurrent);
  
          // Recupera o documento do usuário para obter os 'likes' armazenados
          const userDoc = await userDocRef.get().toPromise();
          if (!userDoc || !userDoc.exists) {
            observer.next([]); // Documento do usuário não encontrado
            observer.complete();
            return;
          }
          const currentUserLikes = (userDoc.data() as Perfil)?.likes || [];
          console.log("Currente Likes do usuario aatual: ", currentUserLikes)
  
          // Define a consulta na coleção 'users', excluindo o próprio usuário e filtrando curtidos
          const query = this.firestore.collection('users', (ref) => {
            let baseQuery = ref.orderBy('username').limit(limit); // Ordena por username
            baseQuery = baseQuery.where('uid', '!=', uidUserCurrent); // Exclui o próprio usuário
            if (this.lastDocument) {
              baseQuery = baseQuery.startAfter(this.lastDocument);
            }
            return baseQuery;
          });
  
          // Faz a consulta na coleção de usuários
          const snapshot = await query.get().toPromise();
          if (!snapshot || snapshot.empty) {
            observer.next([]); // Nenhum perfil encontrado
            observer.complete();
            return;
          }
  
          // Atualiza o último documento para paginação
          this.lastDocument = snapshot.docs[snapshot.docs.length - 1];
  
          // Processa os documentos retornados
          const documents: Perfil[] = snapshot.docs
            .map((doc) => {
              const data = doc.data() as Perfil; // Faz o casting para Perfil
              const id_usuario = doc.id;
  
              // Exclui os usuários já curtidos
              if (currentUserLikes.includes(id_usuario)) {
                return null; // Retorna null para likes já existentes
              }
              return { id_usuario, ...data }; // Inclui o perfil no resultado
            })
            .filter((perfil) => perfil !== null) as Perfil[]; // Remove os nulos do array
  
          observer.next(documents); // Envia os perfis válidos para o Observable
          observer.complete();
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
          observer.error(error); // Notifica erro
        }
      })();
    });
  }
  
  
  
  // Método para resetar a paginação
  resetPagination() {
    this.lastDocument = null;
  }
}