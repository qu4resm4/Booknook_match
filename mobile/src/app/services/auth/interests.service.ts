import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {
  constructor(private firestore: AngularFirestore) {}

  getAllInterests(): Observable<any[]> {
    // obtem todos os interesses disponiveis na coleção "interests"
    return this.firestore.collection('interests').valueChanges();
  }

  // função pra salvar os interesses do usuário na coleção "usernames"
  saveUserInterests(userId: string, interests: string[]): Promise<void> {
    return this.firestore.collection('usernames').doc(userId).set(
      { interests },
      { merge: true } // o { merge: true } mantém os dados existentes ao adicionar novos interesses
    );
  }

  // função para buscar os interesses de um usuário específico, caso necessário
  getUserInterests(userId: string): Observable<any> {
    return this.firestore.collection('usernames').doc(userId).valueChanges();
  }
}
