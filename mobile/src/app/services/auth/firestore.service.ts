import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable, switchMap } from 'rxjs';
import { Perfil } from 'src/app/models/perfil.model';
import { getFirestore, arrayUnion, doc, updateDoc, QuerySnapshot } from 'firebase/firestore'; // Importação corrigida para Firebase v9+
import { AuthService } from './auth.service';


// Interface para os dados do usuário
interface UserData {
  interesses_usuario?: string[]; // Propriedade de interesses do usuário
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private lastDocument: QueryDocumentSnapshot<any> | null = null;
  private lastUserUID: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService
  ) {}

  // Método para buscar o perfil do usuário pelo seu ID
  getPerfil(uid: string): Observable<Perfil> {
    return this.firestore.collection('users').doc(uid).get().pipe(
      switchMap(doc => {
        if (doc.exists) {
          const perfil = doc.data() as Perfil;
          return perfil ? [perfil] : []; // Retorna o perfil encontrado
        } else {
          throw new Error('Perfil não encontrado');
        }
      })
    );
  }

  // Método para adicionar ou atualizar uma resenha do usuário
  async updateOrAddResenha(userId: string, novaResenha: any): Promise<void> {
    try {
      // Referência ao documento do usuário
      const userRef = this.firestore.collection('users').doc(userId);
  
      // Obtém o documento do usuário
      const userDoc = await userRef.get().toPromise();
  
      if (!userDoc || !userDoc.exists) {
        console.error('Documento do usuário não encontrado!');
        throw new Error('Documento do usuário não encontrado.');
      }
  
      // Garante o tipo correto para os dados do usuário
      const userData = userDoc.data() as { resenhas: any[] } | undefined;
  
      if (!userData) {
        console.error('Dados do usuário estão indefinidos!');
        throw new Error('Dados do usuário estão indefinidos!');
      }
  
      // Obtém ou inicializa o array de resenhas
      const resenhas = userData.resenhas || [];
  
      // Verifica se já existe uma resenha para o livro
      const resenhaExistenteIndex = resenhas.findIndex(
        (resenha) => resenha.livroId === novaResenha.livroId
      );
  
      if (resenhaExistenteIndex > -1) {
        // Atualiza a resenha existente
        resenhas[resenhaExistenteIndex] = novaResenha;
      } else {
        // Adiciona uma nova resenha
        resenhas.push(novaResenha);
      }
  
      // Atualiza o documento do usuário com o array de resenhas atualizado
      await userRef.update({ resenhas });
      console.log('Resenha atualizada/adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar ou adicionar a resenha:', error);
      throw error;
    }
  }
  

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

  // Método para buscar os interesses de um usuário a partir de seu ID
  getInteressesById(uid: string): Observable<any> {
    return this.firestore
      .collection('users')
      .doc(uid)
      .get()
      .pipe(
        switchMap((userDoc) => {
          if (!userDoc.exists) {
            throw new Error('Usuário não encontrado');
          }
          const userData = userDoc.data() as UserData; // Garante que userData tenha o tipo UserData
          return userData?.interesses_usuario || []; // Retorna os interesses do usuário ou um array vazio
        })
      );
  }

  // Busca os perfis dos usuários com paginação
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

          // Verifica se o usuário atual mudou
          if (this.lastUserUID !== uidUserCurrent) {
            console.log("Usuário autenticado mudou, reiniciando paginação.");
            this.lastUserUID = uidUserCurrent; // Atualiza para o novo UID
            this.lastDocument = null; // Reinicia o estado de paginação
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
