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
  userId: string | null = null; // ID do usuário autenticado
  biografia: string = ''; // Biografia do usuário (se disponível)
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
          console.log(livro)
          this.livroId = livro.id || '';
          this.tituloLivro = livro.volumeInfo.title || '';
          this.categorias_livro = livro.volumeInfo.categories;
          console.log("variavel depois de associar: ", this.tituloLivro);
          console.log("recebido variavel: ", livro.title);
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
      titulo_resenha: this.tituloResenha,
      nome_livro: this.tituloLivro,
      resenha: this.textoResenha,
      categorias_livro: this.categorias_livro  || '',
      data: new Date(), // Data de criação da resenha
    };


    try {
      this.isSaving = true;

      // Verifica se o usuário está autenticado
      if (!this.userId) {
        console.error('Usuário não autenticado!');
        return;
      }

      console.log("usuario logado?", this.userId)

      // Salva a resenha no Firestore
      await this.firestoreService.addResenhaUsuario(this.userId, resenha);
      console.log('Resenha salva com sucesso!');

      // objeto do livro 
      const livro = {
        "id": this.livroId,
        "title": this.tituloLivro
      };

      // exclui da storage TODOS
      await this.storage.excluirDaEstante(livro.id, "-TODOS");

      // inclui na storage RESENHADOS
      await this.storage.adicionarNaEstante(livro, '-RESENHADOS');
      
      // Redireciona para a página da estante
      this.navCtrl.navigateForward('tabs/estante');
    } catch (error) {
      console.error('Erro ao salvar a resenha:', error);
    } finally {
      this.isSaving = false;
    }
  }
}
