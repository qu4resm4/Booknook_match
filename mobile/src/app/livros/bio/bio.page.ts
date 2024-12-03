// Atualizado bio.page.ts
import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/auth/firestore.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageBooksService } from 'src/app/services/storage-books/storage-books.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
})
export class BioPage {
  livroId: string = '';
  tituloLivro: string = '';
  textoResenha: string = '';
  tituloResenha: string = '';
  isSaving: boolean = false;
  userId: string | null = null;
  biografia: string = '';
  categorias_livro: string[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storage: StorageBooksService
  ) {}

  async ionViewWillEnter() {
    // Recupera parâmetros da navegação
    this.route.queryParams.subscribe(params => {
      if (params['livro']) {
        try {
          const livro = JSON.parse(params['livro']);
          this.livroId = livro.id || '';
          this.tituloLivro = livro.volumeInfo.title || '';
          this.categorias_livro = livro.volumeInfo.categories || [];
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

    try {
      const perfil = await this.firestoreService.getPerfil(this.userId).toPromise();
      if (perfil) {
        this.biografia = perfil.biografia || '';
        const resenhaExistente = perfil.resenhas?.find(resenha => resenha.livroId === this.livroId);
        if (resenhaExistente) {
          this.mostrarOpcoesDeResenha(resenhaExistente);
        }
      }
    } catch (error) {
      console.error('Erro ao recuperar o perfil do usuário:', error);
    }
  }

  async mostrarOpcoesDeResenha(resenhaExistente: any) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Resenha existente';
    alert.message = 'Você já criou uma resenha para este livro. Deseja editar ou cancelar?';
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Editar',
        handler: () => {
          this.tituloResenha = resenhaExistente.titulo_resenha;
          this.textoResenha = resenhaExistente.resenha;
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  async enviarResenha() {
    if (!this.textoResenha.trim()) {
      console.error('A resenha está vazia!');
      return;
    }

    const resenha = {
      livroId: this.livroId,
      titulo_resenha: this.tituloResenha,
      nome_livro: this.tituloLivro,
      resenha: this.textoResenha,
      categorias_livro: this.categorias_livro || [],
      data: new Date(),
    };

    try {
      this.isSaving = true;

      if (!this.userId) {
        console.error('Usuário não autenticado!');
        return;
      }

      await this.firestoreService.updateOrAddResenha(this.userId, resenha);

      const livro = { id: this.livroId, title: this.tituloLivro };
      await this.storage.excluirDaEstante(livro.id, '-TODOS');
      await this.storage.adicionarNaEstante(livro, '-RESENHADOS');

      this.navCtrl.navigateForward('tabs/estante');
    } catch (error) {
      console.error('Erro ao salvar a resenha:', error);
    } finally {
      this.isSaving = false;
    }
  }
}
