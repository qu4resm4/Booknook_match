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
        const query = this.firestore.collection('users', ref => {
          let baseQuery = ref.orderBy('username').limit(limit); // Use o campo de ordenação apropriado
          if (uid) {
            baseQuery = baseQuery.where('uid', '!=', uid); // Exclui o próprio usuário
          }
          if (this.lastDocument) {
            baseQuery = baseQuery.startAfter(this.lastDocument);
          }
          return baseQuery;
        });
  
        return new Observable<Perfil[]>(observer => {
          query.get().subscribe(snapshot => {
            if (!snapshot.empty) {
              this.lastDocument = snapshot.docs[snapshot.docs.length - 1]; // Atualiza o último documento
              const documents: Perfil[] = snapshot.docs.map((doc: QueryDocumentSnapshot<any>) => {
                console.log("FORMATO DE DATA RECEBIDO: ", doc.data());
                const data = doc.data() as Perfil; // Faz o casting para a interface Perfil
                console.log("CASTING FEITO NOS DADOS RECEBIDOS:", data)
                return { id_usuario: doc.id, ...data }; // Retorna o objeto com ID incluído
              });
              observer.next(documents);
            } else {
              observer.next([]);
            }
          });
        });
      })
    );
  }
  // Método para resetar a paginação
  resetPagination() {
    this.lastDocument = null;
  }
}
