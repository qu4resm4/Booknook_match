import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatPerilService {
  private API_URL = '../../../assets/json/chatperfil.json';

  constructor(private http: HttpClient) { }

  // Método para buscar os dados
  getPerfil(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
