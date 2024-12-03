import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChatPerilService } from 'src/app/services/chat-perfil/chat-peril.service';
import { InterestsService } from 'src/app/services/auth/interests.service';
import { Perfil } from 'src/app/models/perfil.model';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage{
  perfil: Perfil | any = { 
    username: '',
    email: '',
    biografia: '',
    interesses_usuario: [], 
    resenhas: [] 
  };
  userViewId: string = '';
  userCurrentId: string = '';
  isOwnProfile: boolean = false; // Variável para diferenciar o perfil

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router,
    private interestsService: InterestsService,
    private params: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.getCurrentUser();
    this.loadUserProfile();
  }
  async getCurrentUser() {
    this.userCurrentId = await this.authService.getCurrentUserId();
  }

  async loadUserProfile() {
    try {
      this.params.queryParams.subscribe(params => {
        if (params['uid']) {
          this.userViewId = params['uid'];
        }
      });

      if (this.userViewId) {
        // Carregar o perfil do usuário
        this.firestore.collection('users').doc(this.userViewId).get().subscribe({
          next: (data: any) => {
            if (data.exists) {
              this.perfil = data.data();
              console.log('Perfil carregado:', this.perfil);
              // Carregar as resenhas associadas ao usuário
              this.firestore.collection('users').doc(this.userViewId).collection('resenhas').get().subscribe(resenhasDoc => {
                resenhasDoc.forEach((doc) => {
                  const resenha = doc.data();
                  resenha['categorias_livro'] = Array.isArray(resenha['categorias_livro']) ? resenha['categorias_livro'] : [resenha['categorias_livro'] || ''];
                  this.perfil.resenhas.push(resenha);
                });
              });
              // Carregar os interesses do usuário
              this.getInteressesUsuario(this.userViewId);
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
        if (data?.interests) {
          this.perfil.interesses_usuario = data.interests;
          console.log('Interesses do usuário:', this.perfil.interesses_usuario);
        }
      },
      error => {
        console.error('Erro ao carregar interesses', error);
      }
    );
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
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

  editarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }
}
