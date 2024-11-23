import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatPerilService {
  private API_URL = '../../../assets/json/chatperfil.json';

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  // Método para buscar dados de um JSON
  getPerfil(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  // Método para buscar mensagens de chat entre dois usuários
  getChat(chatId: string): Observable<any> {
    return this.firestore.collection('chats').doc(chatId).valueChanges();
  }
}
