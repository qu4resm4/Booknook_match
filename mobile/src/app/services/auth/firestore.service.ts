import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/models/perfil.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
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
}
