import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(true);

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: Storage
  ) {
    this.storage.create();
    this.checkLoginStatus();
  }

  async checkLoginStatus() {
    const token = await this.storage.get('token');
    if (token == null) {
      this.loggedIn.next(false);
    }
  }

  isLoggedIn() {
    console.log("valor do loggedIn no serviço: ", this.loggedIn.asObservable())
    return this.loggedIn.asObservable();
  }

  async register(username: string, email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user?.uid;

      if (uid) {
        // Salvar os dados na coleção 'users'
        await this.firestore.collection('users').doc(uid).set({
          uid,
          username,
          email,
          resenhas: [],
          interesses_usuario: []
        });

        // Salvar UID no armazenamento local
        localStorage.setItem('userUID', uid);
        await this.storage.set('uid', uid);

        console.log('UID salvo no registro:', uid);
        return true;
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
    return false;
  }

  async loginWithUsername(username: string, password: string): Promise<boolean> {
    try {
      // Busca o documento do usuário na coleção "users" com base no username
      const userQuerySnapshot = await this.firestore
        .collection('users', ref => ref.where('username', '==', username))
        .get()
        .toPromise();
  
      if (!userQuerySnapshot || userQuerySnapshot.empty) {
        throw new Error('Nome de usuário não encontrado.');
      }
  
      // Assume que o username é único e pega o primeiro documento encontrado
      const userDoc = userQuerySnapshot.docs[0];
      const userData = userDoc.data() as { uid: string; email: string };
  
      if (!userData || !userData.email || !userData.uid) {
        throw new Error('Dados do usuário inválidos.');
      }
  
      // Realiza o login usando o email recuperado e a senha fornecida
      const user = await this.afAuth.signInWithEmailAndPassword(userData.email, password);
      const token = await user.user?.getIdToken();
  
      if (token && userData.uid) {
        // Salva o token e o UID no armazenamento local
        await this.storage.set('token', token);
        await this.storage.set('uid', userData.uid);
  
        this.loggedIn.next(true); // Atualiza o estado de autenticação
        return true;
      } else {
        return false;
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'Erro desconhecido.';
      console.error('Erro ao fazer login:', errorMessage);
      return false;
    }
    
  }

  async getUserId(): Promise<string | null> {
    const uid = await this.storage.get('uid'); // Certifique-se de usar a implementação correta
    return uid || null;
  }
  
  

  async logout() {
    try {
      await this.afAuth.signOut();
      await this.storage.remove('token');
      await this.storage.remove('uid');
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  }

  async resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  async getCurrentUserId() {
    return await this.storage.get('uid');
  }
}
