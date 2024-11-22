import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/models/perfil.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private lastDocument: QueryDocumentSnapshot<any> | null = null;

  constructor(private firestore: AngularFirestore) {}

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

  // Método para buscar usuários com paginação
  getUsers(limit: number): Observable<Perfil[]> {
    let query = this.firestore.collection('users', ref => {
      let baseQuery = ref.orderBy('name').limit(limit); // Substitua 'name' pelo campo usado para ordenar
      if (this.lastDocument) {
        baseQuery = baseQuery.startAfter(this.lastDocument);
      }
      return baseQuery;
    });

    return new Observable(observer => {
      query.get().subscribe(snapshot => {
        if (!snapshot.empty) {
          this.lastDocument = snapshot.docs[snapshot.docs.length - 1]; // Atualiza o último documento
          observer.next(
            snapshot.docs.map(doc => {
              const data = doc.data() as Perfil; // Faz o casting para a interface Perfil
              return { id_usuario: doc.id, ...data }; // Combina o ID com os dados
            })
          );
        } else {
          observer.next([]);
        }
      });
    });
  }

  // Método para resetar a paginação
  resetPagination() {
    this.lastDocument = null;
  }
}
