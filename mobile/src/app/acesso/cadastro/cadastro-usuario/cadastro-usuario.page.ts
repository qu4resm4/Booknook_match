import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from '../../../services/register_user/register-user.service'

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {
  user = '';
  email = '';
  password = '';

  constructor(
    private register: RegisterUserService
  ) { }

  ngOnInit() {
  }

  async submit() {
    console.log(this.register.cadastrar(this.user, this.email, this.password));
    this.user = '';
    this.email = '';
    this.password = '';

    // try catch (tratamento de erro caso já tenha o email cadastrado)
    //await this. cadastrar()
    //await login
    // salvar jwt
    //redirecionar para página de interesses
    //redi enviando o id do usuário
  }
}
