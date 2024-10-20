import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  private url = environment.API_ENDPOINT;

  constructor(private http: HttpClient) { 
  }

  cadastrar(us: string, em: string, pss: string) {
    console.log("cadastro clicado");

    // Corrigido: passa os headers no terceiro parâmetro
    return this.http.post(`${this.url}/cadastro`,
      {
        "username": us,
        "password": pss,
        "email": em
      }
      ).subscribe({
      next: (response: any) => {
        console.log("Cadastrado com sucesso!");
        console.log(response);
      },
      error: (e) => {
        console.error('Erro ao cadastrar usuário: ', e);
        // tratamento de erro para aparecer mensagem de EMAIL já cadastrado ou se username indisponivel.
        //Aparecer mensagem de erro em vermelho abaixo do input e transformar input em vermelho
      }
    });
  }
}
