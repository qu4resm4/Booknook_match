import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private url = 'assets/json/test.json';

  constructor(private http: HttpClient) { }

  // Método para buscar os dados
  getLivros(): Observable<any> {
    return this.http.get(this.url);
  }
}