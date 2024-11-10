import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private afAuth: AngularFireAuth,
    private storage: Storage
  ) {
    this.storage.create(); // Inicializa o storage
    this.checkLoginStatus();
  }

  // Verifica se o usuário está logado ao abrir o app
  private async checkLoginStatus() {
    const token = await this.storage.get('token');
    this.loggedIn.next(!!token); // Verifica se há um token salvo
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  async register(email: string, password: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user?.uid;
    if (uid) {
      localStorage.setItem('userUID', uid);
    }
    return uid;
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      
      // Obtenha o token e o uid do usuário autenticado
      const token = await userCredential.user?.getIdToken();
      const uid = userCredential.user?.uid;

      if (token && uid) {
        // Salva o token e o uid no armazenamento local
        await this.storage.set('token', token);
        await this.storage.set('uid', uid);
        this.loggedIn.next(true);
      }
    } catch (error) {
      console.error('Login falhou:', error);
    }
  }

  async logout() {
    await this.afAuth.signOut();
    await this.storage.remove('token');
    await this.storage.remove('uid');
    this.loggedIn.next(false);
    /*this.router.navigate(['/login']);*/
  }

  async resetPassword(email: string) {
    return  await this.afAuth.sendPasswordResetEmail(email);
  }

  // Método para obter o ID do usuário logado (uid)
  async getUserId() {
    return await this.storage.get('uid');
  }

  // Método para obter o token de autenticação salvo
  async getToken() {
    return await this.storage.get('token');
  }
}

/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
*/

/*
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Armazena o estado do login


  private userId: string = '';

  setUserID(userId: string) {
    this.userId = userId;
  }
  getUserID(): string {
    return this.userId;
  }

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

    // Função para verificar o estado de autenticação
    isLoggedIn(): Observable<boolean> {
      return this.loggedIn.asObservable();
    }

  async register(email: string, password: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user?.uid;
    if (uid) {
      localStorage.setItem('userUID', uid);
    }
    return uid;
  }

  async login(email: string, password: string) {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    const uid = userCredential.user?.uid;
    if (uid) {
      localStorage.setItem('userUID', uid);
    }
    return uid;
  }

  logout() {
    this.afAuth.signOut();
    localStorage.removeItem('userUID');
    this.router.navigate(['/login']);
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('userUID');
  }
}
  */