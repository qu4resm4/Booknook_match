import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatPerilService } from '../../services/chat-perfil/chat-peril.service';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from 'src/app/services/auth/firestore.service';
import { Perfil } from 'src/app/models/perfil.model';
import { InterestsService } from 'src/app/services/auth/interests.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  perfil!: Perfil;
  interessesDisponiveis: string[] = ['Ficção', 'Romance', 'Aventura', 'Mistério', 'Fantasia', 'Sci-Fi'];
  interessesUsuario: string[] = [];

  constructor(
    private p: ChatPerilService,
    private authService: AuthService,
    private firestoreService: FirestoreService, 
    private router: Router,
    private interestsService: InterestsService,
    private params: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPerfil();
  }

  async getPerfil() {
    try {
      /*const userId = await this.authService.getCurrentUserId();*/
      let userId = '';
      this.params.queryParams.subscribe(params => {
        if (params['uid']) {
          try {
            userId = params['uid'];
          } catch (error) {
            console.error( error);
          }
        }
      });
      if (userId) {
        this.firestoreService.getPerfil(userId).subscribe({
          next: (data: Perfil | undefined) => {
            if (data) {
              this.perfil = data;
              this.getInteressesUsuario(userId);
            } else {
              console.error("Perfil não encontrado");
            }
          },
          error: (e) => {
            console.error("Erro ao carregar perfil", e);
          }
        });
      } else {
        console.error("Usuário não autenticado");
      }
    } catch (e) {
      console.error("Erro ao recuperar ID do usuário", e);
    }
  }

  getInteressesUsuario(userId: string) {
    this.interestsService.getUserInterests(userId).subscribe(
      (data: any) => {
        if (data && data.interests) {
          this.interessesUsuario = data.interests;
        }
      },
      error => {
        console.error("Erro ao carregar interesses", error);
      }
    );
  }

  salvarPerfil() {
    this.firestoreService.updatePerfil(this.perfil).then(() => {
      console.log('Perfil atualizado com sucesso!');
    }).catch(error => {
      console.error('Erro ao salvar perfil', error);
    });
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  }

  denunciarUsuario() {
    console.log('Usuário denunciado');
    // Lógica de denúncia
  }

  desfazerMatch() {
    console.log('Match desfeito');
    // Lógica para desfazer match
  }

  editPerfil() {
    this.router.navigate(['/editar-perfil']);
  }
}
