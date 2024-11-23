import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable, switchMap } from 'rxjs';
import { Perfil } from 'src/app/models/perfil.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getFirestore, arrayUnion, doc, updateDoc } from 'firebase/firestore'; // Importação corrigida para Firebase v9+

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private lastDocument: QueryDocumentSnapshot<any> | null = null;

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
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
    return this.auth.user.pipe(
      switchMap(user => {
        const uid = user?.uid;
        const query = this.firestore.collection('users', ref => {
          let baseQuery = ref.orderBy('username').limit(limit);
          if (uid) {
            baseQuery = baseQuery.where('uid', '!=', uid);
          }
          if (this.lastDocument) {
            baseQuery = baseQuery.startAfter(this.lastDocument);
          }
          return baseQuery;
        });

        return new Observable<Perfil[]>(observer => {
          query.get().subscribe(snapshot => {
            if (!snapshot.empty) {
              this.lastDocument = snapshot.docs[snapshot.docs.length - 1];
              const documents: Perfil[] = snapshot.docs.map(doc => {
                const data = doc.data() as Perfil;
                return { id_usuario: doc.id, ...data };
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

  resetPagination() {
    this.lastDocument = null;
  }
}
