import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {
  private id_route: string = '';
  private API_URL = 'https://www.googleapis.com/books/v1/volumes';
  private key = 'AIzaSyAIcILxTfOFUOuTlpq1quE8-FKVwkcZW2A';

  constructor(private http: HttpClient) { }

  // Método para buscar os dados
  getLivros(query: string): Observable<any> {
    const url = `${this.API_URL}?q="${query}"&key=${this.key}`;
    return this.http.get(url);
  }

  getLivrosbyId(id: any): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get(url);
  }

    // Método para setar o id do livro da rota
    setData(id: string) {
      this.id_route = id;
    }
  
    // Método para obter o id do livro da rota
    getData() {
      return this.id_route;
    }
}