import { Component, OnInit } from '@angular/core';

import { ChatPerilService } from '../../services/chat-perfil/chat-peril.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  perfil: any;
  constructor(
    private p: ChatPerilService
  ) { }

  getPerfil(){
    //chamando API
    this.p.getPerfil().subscribe({
      next: (data: any) => {
        //carregando os dados
        this.perfil = data;
        console.log("sucesso JSON");
        console.log(this.perfil);
      },
      error: (e) => {
        console.error('Erro ao carregar dados', e);
      }
    }
    );
  }

  denunciarUsuario(){

  }

  desfazerMatch(){

  }

  ngOnInit() {
    this.getPerfil()
  }
}
