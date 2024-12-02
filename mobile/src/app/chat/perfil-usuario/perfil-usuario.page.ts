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
export class PerfilUsuarioPage implements OnInit {
  perfil: Perfil | any = { // Dados do perfil
    username: '',
    email: '',
    biografia: '',
    interests: [], // Array para armazenar os interesses
    resenhas: []  // Array para armazenar as resenhas
  };
  interessesDisponiveis: string[] = ['Ficção', 'Romance', 'Aventura', 'Mistério', 'Fantasia', 'Sci-Fi'];
  interessesUsuario: string[] = [];
  uid: string | null = null;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router,
    private chatPerilService: ChatPerilService,
    private interestsService: InterestsService,
    private params: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    this.uid = await this.authService.getCurrentUserId(); // Obtém o UID atual do usuário
  
    if (this.uid) {
      try {
        const userDoc = await this.firestore.collection('users').doc(this.uid).get().toPromise();
  
        if (userDoc && userDoc.exists) {
          const data = userDoc.data();
          if (data) {
            this.perfil = data; // Agora 'data' é garantidamente um objeto
            console.log('Perfil carregado:', this.perfil);
  
            // Carregar as resenhas associadas ao usuário
            const resenhasDoc = await this.firestore.collection('users').doc(this.uid).collection('resenhas').get().toPromise();
  
            if (resenhasDoc && !resenhasDoc.empty) {
              resenhasDoc.forEach((doc) => {
                const resenha = doc.data();
  
                // Verificar e garantir que categorias_livro seja um array
                if (!Array.isArray(resenha['categorias_livro'])) {
                  resenha['categorias_livro'] = resenha['categorias_livro'] ? [resenha['categorias_livro']] : [];
                }
  
                this.perfil.resenhas.push(resenha); // Adiciona as resenhas
              });
            } else {
              console.log('Não há resenhas para este usuário.');
            }
  
            // Carregar os interesses do usuário
            this.getInteressesUsuario(this.uid);
          } else {
            console.error('O documento não contém dados!');
          }
        } else {
          console.error('Usuário não encontrado ou o documento não existe!');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
  }
  
  

  getInteressesUsuario(userId: string) {
    this.interestsService.getUserInterests(userId).subscribe(
      (data: any) => {
        if (data && data.interests) {
          this.interessesUsuario = data.interests;
          console.log('Interesses do usuário:', this.interessesUsuario);
        }
      },
      error => {
        console.error('Erro ao carregar interesses', error);
      }
    );
  }

  salvarPerfil() {
    if (this.uid) { // Verifica se o UID está disponível
      this.firestore.collection('users').doc(this.uid).update(this.perfil).then(() => {
        console.log('Perfil atualizado com sucesso!');
      }).catch(error => {
        console.error('Erro ao salvar perfil', error);
      });
    } else {
      console.error('UID do usuário não encontrado');
    }
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
