import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatPerilService } from '../../services/chat-perfil/chat-peril.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  perfil: any;

  constructor(
    private p: ChatPerilService,
    private authService: AuthService, // Injeção do serviço de autenticação
    private router: Router // Injeção do roteador para redirecionamento
  ) {}

  ngOnInit() {
    this.getPerfil();
  }

  getPerfil() {
    // Chamando API para obter dados do perfil
    this.p.getPerfil().subscribe({
      next: (data: any) => {
        this.perfil = data;
        console.log("Sucesso ao carregar JSON");
        console.log(this.perfil);
      },
      error: (e) => {
        console.error('Erro ao carregar dados', e);
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']); // Redireciona para a página de login após o logout
    }).catch(error => {
      console.error("Erro ao realizar logout:", error);
    });
  }

  denunciarUsuario() {
    // Lógica para denunciar e bloquear usuário
  }

  desfazerMatch() {
    // Lógica para desfazer o match
  }
}
