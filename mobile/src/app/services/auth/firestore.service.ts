import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable, switchMap } from 'rxjs';
import { Perfil } from 'src/app/models/perfil.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private lastDocument: QueryDocumentSnapshot<any> | null = null;

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  // Método para adicionar uma resenha na subcoleção 'resenhas' do usuário
  async addResenhaUsuario(userId: string, resenha: any): Promise<void> {
    try {
      // Salva a resenha na subcoleção 'resenhas' do usuário
      await this.firestore.collection('users').doc(userId).collection('resenhas').add(resenha);
      console.log('Resenha salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar a resenha:', error);
      throw new Error('Erro ao salvar a resenha');
    }
  }

  // Método para atualizar o perfil do usuário
  updatePerfil(perfil: Perfil): Promise<void> {
    const userId = perfil.id_usuario;
    if (!userId) {
      throw new Error('ID de usuário não encontrado');
    }

    // Garante que biografia seja sempre uma string
    const biografia = perfil.biografia || ''; // Se for null ou undefined, usa uma string vazia

    return this.firestore
      .collection('users')
      .doc(userId)
      .update({
        biografia: biografia, // Atualiza o campo 'biografia' com uma string
        interesses_usuario: perfil.interesses_usuario,
        resenhas: perfil.resenhas,
      })
      .catch((error) => {
        console.error('Erro ao atualizar perfil: ', error);
        throw new Error('Erro ao atualizar perfil');
      });
  }

  // Função que retorna um perfil específico do Firestore
  getPerfil(uid: string): Observable<Perfil | undefined> {
    return this.firestore.collection('users').doc<Perfil>(uid).valueChanges();
  }

  getUsers(limit: number): Observable<Perfil[]> {
    return this.auth.user.pipe(
      switchMap(user => {
        const uid = user?.uid; // UID do usuário autenticado
        if (!uid) {
          return []; // Se não tiver usuário autenticado, retorna uma lista vazia
        }
  
        // Referência ao documento do usuário autenticado
        const userDocRef = this.firestore.collection('users').doc(uid);
  
        // Recupera o documento do usuário para obter os 'likes' armazenados
        return userDocRef.get().pipe(
          switchMap(doc => {
            const currentUserLikes = (doc.data() as Perfil)?.likes || [];
  
            // Agora que temos os 'likes', podemos consultar a coleção 'users'
            const query = this.firestore.collection('users', ref => {
              let baseQuery = ref.orderBy('username').limit(limit); // Ordena por nome (ou outro campo desejado)
              if (uid) {
                baseQuery = baseQuery.where('uid', '!=', uid); // Exclui o próprio usuário
              }
              if (this.lastDocument) {
                baseQuery = baseQuery.startAfter(this.lastDocument);
              }
              return baseQuery;
            });
  
            // Faz a consulta na coleção de usuários
            return new Observable<Perfil[]>(observer => {
              query.get().subscribe(snapshot => {
                if (!snapshot.empty) {
                  this.lastDocument = snapshot.docs[snapshot.docs.length - 1]; // Atualiza o último documento
                  const documents: Perfil[] = snapshot.docs.map((doc: QueryDocumentSnapshot<any>) => {
                    const data = doc.data() as Perfil; // Faz o casting para a interface Perfil
                    const id_usuario = doc.id;
                    
                    // Verifica se o ID do usuário já está na lista de likes do usuário autenticado
                    if (currentUserLikes.includes(id_usuario)) {
                      return {} as Perfil; // Se o ID estiver nos likes, não inclui no resultado
                    }
  
                    // Retorna o perfil somente se o ID não estiver nos likes
                    return { id_usuario, ...data };
                  }).filter(Boolean); // Remove os nulls, ou seja, os perfis já curtidos
  
                  observer.next(documents); // Envia os perfis não curtidos
                } else {
                  observer.next([]); // Caso não haja resultados
                }
              });
            });
          })
        );
      })
    );
  }
  
  // Método para resetar a paginação
  resetPagination() {
    this.lastDocument = null;
  }
}
