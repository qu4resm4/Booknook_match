import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfisService {

  private API_URL = '../../../assets/json/perfis.json';

  constructor(private http: HttpClient) { }

  // Método para buscar os dados
  getPerfis(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}