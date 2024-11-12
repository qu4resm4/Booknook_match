// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

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
  
  async register(username: string, email: string, password: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user?.uid;

    if (uid) {
      await this.firestore.collection('usernames').doc(username).set({ uid, email });
      localStorage.setItem('userUID', uid);
    }

    return uid;
  }

  async loginWithUsername(username: string, password: string): Promise<boolean> {
    try {
      // Obter o documento do Firestore com o UID associado ao nome de usuário
      const usernameDoc = await this.firestore.collection('usernames').doc(username).get().toPromise();
      
      const userData = usernameDoc?.data() as UsernameDoc | undefined;
      const email = userData?.email;
  
      if (!email) {
        throw new Error('Nome de usuário não encontrado');
      }
  
      // Tenta autenticar usando o email
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);
      const token = await user.user?.getIdToken();
  
      if (token && userData.uid) {
        await this.storage.set('token', token);
        await this.storage.set('uid', userData.uid);
        this.loggedIn.next(true);
        return true;  // Login bem-sucedido
      } else {
        return false; // Falha no login
      }
    } catch (error) {
      console.error('Login falhou:', error);
      return false; // Falha no login
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
