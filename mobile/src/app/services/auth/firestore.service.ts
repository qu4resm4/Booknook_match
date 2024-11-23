import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable, switchMap } from 'rxjs';
import { Perfil } from 'src/app/models/perfil.model';
import { getFirestore, arrayUnion, doc, updateDoc, QuerySnapshot } from 'firebase/firestore'; // Importação corrigida para Firebase v9+
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
  async addResenhaUsuario(userId: string, resenha: any): Promise<void> {
    await this.firestore.collection('users').doc(userId).collection('resenhas').add(resenha);
    console.log("ID USUARIO addResenhaUsuario:", userId)
    console.log("RESENHA RECEVIDA addResenhaUsuario:", resenha)
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
          console.log("Current Likes do usuário atual: ", currentUserLikes);
  
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
          const documents: Perfil[] = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const data = doc.data() as Perfil; // Faz o casting para Perfil
              const id_usuario = doc.id;
  
              // Exclui os usuários já curtidos
              if (currentUserLikes.includes(id_usuario)) {
                return {} as Perfil; // Retorna null para likes já existentes
              }
  
              // Obtém as resenhas do sub-collection 'resenhas'
              const resenhasSnapshot = await this.firestore.collection(`users/${id_usuario}/resenhas`).get().toPromise();

              const resenhas =
                resenhasSnapshot && !resenhasSnapshot.empty
                  ? resenhasSnapshot.docs.map((resenhaDoc) => resenhaDoc.data()) as Perfil["resenhas"]
                  : []; // Retorna array vazio caso não haja resenhas ou snapshot seja undefined
  
              return {
                id_usuario,
                ...data,
                resenhas, // Adiciona as resenhas no objeto do Perfil
              };
            })
          );
  
          observer.next(documents.filter((perfil) => perfil !== null) as Perfil[]); // Remove nulos e envia os perfis válidos
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