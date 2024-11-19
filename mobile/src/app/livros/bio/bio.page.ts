import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/auth/firestore.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
})
export class BioPage {
  livroId: string = '';
  tituloLivro: string = '';
  textoResenha: string = '';
  isSaving: boolean = false; // Variável para controlar o estado de salvamento

  constructor(
    private firestoreService: FirestoreService,
    private navCtrl: NavController,
    private route: ActivatedRoute // Para recuperar parâmetros da navegação
  ) {}

  async ionViewWillEnter() {
    // Recupera parâmetros da navegação
    this.route.queryParams.subscribe(params => {
      if (params['livro']) {
        try {
          const livro = JSON.parse(params['livro']); // Converte o JSON para objeto
          this.livroId = livro.id || '';
          this.tituloLivro = livro.title || '';
        } catch (error) {
          console.error('Erro ao processar dados do livro:', error);
        }
      }
    });
  }

  async enviarResenha() {
    if (!this.textoResenha.trim()) {
      // Caso o usuário não tenha escrito nada
      console.error('A resenha está vazia!');
      return;
    }

    const resenha = {
      livroId: this.livroId,
      titulo: this.tituloLivro,
      resenha: this.textoResenha,
      data: new Date(), // Salva a data/hora da criação
    };

    try {
      this.isSaving = true; // Inicia o estado de salvamento

      // Salva a resenha no Firestore
      await this.firestoreService.addResenha(resenha);
      console.log('Resenha salva com sucesso!');
      
      // Redireciona para a página da estante
      this.navCtrl.navigateForward('tabs/estante');
    } catch (error) {
      console.error('Erro ao salvar a resenha:', error);
    } finally {
      this.isSaving = false; // Finaliza o estado de salvamento
    }
  }
}
