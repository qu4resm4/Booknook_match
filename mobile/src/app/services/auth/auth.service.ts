import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

interface UsernameDoc {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: Storage
  ) {
    this.storage.create();
    this.checkLoginStatus();
  }

  private async checkLoginStatus() {
    const token = await this.storage.get('token');
    this.loggedIn.next(!!token);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  async register(username: string, email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user?.uid;
  
      if (uid) {
        // Salvar no documento 'usernames'
        await this.firestore.collection('usernames').doc(username).set({ uid, email });
  
        // Salvar na coleção 'users'
        await this.firestore.collection('users').doc(uid).set({
          username,
          email,
          resenhas: [], // inicia com lista vazia de resenhas
          interesses_usuario: [] // inicia sem interesses
        });
  
        // Salvar UID no local storage e Ionic Storage
        localStorage.setItem('userUID', uid);
        await this.storage.set('uid', uid);
  
        console.log('UID salvo no registro:', uid);
        return true; // Retorna true se o registro foi bem-sucedido
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
    return false; // Retorna false em caso de falha
  }
  
  async loginWithUsername(username: string, password: string): Promise<boolean> {
    try {
      const usernameDoc = await this.firestore.collection('usernames').doc(username).get().toPromise();
      let userData = usernameDoc?.data() as UsernameDoc | undefined;
  
      if (!userData) {
        console.warn('Documento de nome de usuário não encontrado para:', username);
        const emailUser = await this.afAuth.signInWithEmailAndPassword(username, password);
        const email = emailUser.user?.email;
        const uid = emailUser.user?.uid;
  
        if (uid && email) {
          await this.firestore.collection('usernames').doc(username).set({ uid, email });
          userData = { uid, email };
        } else {
          throw new Error('Não foi possível criar o documento do nome de usuário');
        }
      }
  
      const email = userData.email;
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);
      const token = await user.user?.getIdToken();
  
      if (token && userData.uid) {
        await this.storage.set('token', token);
        await this.storage.set('uid', userData.uid);
  
        console.log('UID salvo no login:', userData.uid); // adiciona log
        this.loggedIn.next(true);
        console.log("estado se está logado: ", this.loggedIn)
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login falhou:', error);
      return false;
    }
  }
  
  
  
  async logout() {
    await this.afAuth.signOut();
    await this.storage.remove('token');
    await this.storage.remove('uid');
    this.loggedIn.next(false);
  }

  async resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  async getUserId() {
    return await this.storage.get('uid');
  }

  async getToken() {
    return await this.storage.get('token');
  }
}
