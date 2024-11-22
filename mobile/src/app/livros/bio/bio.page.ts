import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/auth/firestore.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
})
export class BioPage {
  livroId: string = '';
  tituloLivro: string = '';
  textoResenha: string = '';
  isSaving: boolean = false;
  userId: string | null = null; // ID do usuário autenticado
  biografia: string = ''; // Biografia do usuário (se disponível)

  constructor(
    private firestoreService: FirestoreService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  async ionViewWillEnter() {
    // Recupera parâmetros da navegação
    this.route.queryParams.subscribe(params => {
      if (params['livro']) {
        try {
          const livro = JSON.parse(params['livro']);
          this.livroId = livro.id || '';
          this.tituloLivro = livro.title || '';
        } catch (error) {
          console.error('Erro ao processar dados do livro:', error);
        }
      }
    });

    // Recupera o ID do usuário
    this.userId = await this.authService.getUserId();

    if (!this.userId) {
      console.error('Usuário não autenticado!');
      return;
    }

    // Recupera o perfil do usuário para pegar a biografia
    try {
      const perfil = await this.firestoreService.getPerfil(this.userId).toPromise();
      this.biografia = perfil?.biografia || ''; // Se a biografia não existir, será uma string vazia
    } catch (error) {
      console.error('Erro ao recuperar o perfil do usuário:', error);
    }
  }

  // Função para enviar a resenha
  async enviarResenha() {
    if (!this.textoResenha.trim()) {
      console.error('A resenha está vazia!');
      return;
    }

    const resenha = {
      livroId: this.livroId,
      titulo: this.tituloLivro,
      resenha: this.textoResenha,
      data: new Date(), // Data de criação da resenha
    };

    try {
      this.isSaving = true;

      // Verifica se o usuário está autenticado
      if (!this.userId) {
        console.error('Usuário não autenticado!');
        return;
      }

      // Salva a resenha na subcoleção 'resenhas' dentro da coleção 'users'
      await this.firestoreService.addResenhaUsuario(this.userId, resenha);
      console.log('Resenha salva com sucesso!');

      // Redireciona para a página da estante
      this.navCtrl.navigateForward('tabs/estante');
    } catch (error) {
      console.error('Erro ao salvar a resenha:', error);
    } finally {
      this.isSaving = false;
    }
  }
}
