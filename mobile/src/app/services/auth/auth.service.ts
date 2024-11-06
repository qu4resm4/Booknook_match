import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string = '';

  setUserID(userId: string) {
    this.userId = userId;
  }
  getUserID(): string {
    return this.userId;
  }

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

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
