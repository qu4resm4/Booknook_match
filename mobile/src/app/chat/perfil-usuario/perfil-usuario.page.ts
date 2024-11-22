import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatPerilService } from '../../services/chat-perfil/chat-peril.service';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from 'src/app/services/auth/firestore.service';
import { Perfil } from 'src/app/models/perfil.model';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  perfil!: Perfil;
  interessesDisponiveis: string[] = ['Ficção', 'Romance', 'Aventura', 'Mistério', 'Fantasia', 'Sci-Fi']; // Exemplo de interesses disponíveis

  constructor(
    private p: ChatPerilService,
    private authService: AuthService,
    private firestoreService: FirestoreService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.getPerfil();
  }

// Obtém o ID do usuário atual
  // Verifique se os dados estão disponíveis antes de usá-los
getPerfil() {
  this.authService.getCurrentUserId().then(userId => {
    if (userId) {
      this.firestoreService.getPerfil(userId).subscribe({
        next: (data: Perfil | undefined) => {
          if (data) {
            this.perfil = data; // Agora você tem os dados do perfil
          } else {
            console.error("Perfil não encontrado");
          }
        },
        error: (e) => {
          console.error("Erro ao carregar perfil", e);
        }
      });
    }
  });
}


  salvarPerfil() {
    // Salvar as alterações no Firestore
    this.firestoreService.updatePerfil(this.perfil).then(() => {
      console.log('Perfil atualizado com sucesso!');
    }).catch(error => {
      console.error('Erro ao salvar perfil', error);
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

  // Função para redirecionar para a página de edição do perfil
  editPerfil() {
    this.router.navigate(['/editar-perfil']); // Redireciona para a página de edição de perfil
  }
}
