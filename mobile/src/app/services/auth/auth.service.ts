import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.API_ENDPOINT;
  /*
  private token: string = '';
  private loggedIn = new BehaviorSubject<boolean>(false);
  */

  constructor(private http: HttpClient) { 
    /*
    this.token = localStorage.getItem('jwt'); // Recupera o token do localStorage
    this.loggedIn.next(!!this.token); // Atualiza o estado de login
    */
  }

  login(username: string, password: string) {
    console.log(`${username}:${password}`);
    const credentials = btoa(`${username}:${password}`);
    
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    // Corrigido: passa os headers no terceiro parâmetro
    return this.http.post(`${this.url}/login`, {}, { headers: headers }).subscribe({
      next: (response: any) => {
        console.log("Autenticado com sucesso!");
        console.log(response);
        /*
        this.token = response.token; // Armazena o token
        localStorage.setItem('jwt', this.token); // Armazena no localStorage
        this.loggedIn.next(true); // Atualiza o estado de login
        */
      },
      error: (e) => {
        console.error('Erro ao autenticar usuario', e);
        /*Aparecer mensagem de erro na interface de usuario*/
      }
    });
  }

    
}
