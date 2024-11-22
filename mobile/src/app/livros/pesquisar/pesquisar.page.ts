import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { LivrosService } from '../../services/livros/livros.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
  query: string = '';
  livros: any[] = [];
  totalImages: number = 0;
  imagesLoaded: number = 0;

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private livrosService: LivrosService
  ) {}

  async getLivros() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
      cssClass: 'custom',
    });

    await loading.present();

    if (this.query.trim() === '') {
      loading.dismiss();
      return;
    }

    await this.livrosService.getLivros(this.query).subscribe({
      next: (data: any) => {
        this.livros = data.items || [];
        this.totalImages = this.livros.length; // Atualiza o número total de imagens esperadas
        this.imagesLoaded = 0; // Reinicia o contador de imagens carregadas

        // caso não haja livros retornados, encerra o loader imediatamente
        if (this.totalImages === 0) {
          loading.dismiss();
        }
      },
      error: (e) => {
        console.error('Erro ao carregar dados', e);
        loading.dismiss();
      },
    });
  }

  /**
   * função chamada quando uma imagem é carregada com sucesso.
   * vai incrementar o contador de imagens carregadas e verificar se o loader pode ser encerrado
   */
  onImageLoad(event: Event) {
    const imgElement = event.target as HTMLImageElement;

    // verifica se a imagem foi carregada com sucesso
    if (imgElement.complete && imgElement.naturalHeight !== 0) {
      this.imagesLoaded++;
    } else {
      // em caso de falha, ainda assim incrementa para evitar travamento do loader
      this.imagesLoaded++;
    }

    // desativa o loader quando todas as imagens tiverem sido processadas
    if (this.imagesLoaded === this.totalImages) {
      this.loadingController.dismiss();
    }
  }

  /**
   * Função chamada quando uma imagem não carrega (erro de carregamento).
   * Incrementa o contador para evitar que o loader fique preso.
   */
  onImageError() {
    this.imagesLoaded++;

    // desativa o loader se todas as imagens tiverem sido processadas, mesmo com falhas
    if (this.imagesLoaded === this.totalImages) {
      this.loadingController.dismiss();
    }
  }

  /**
   * redireciona para a página de informações do livro selecionado.
   * @param id ID do livro selecionado
   */
  redirecionandoInfoLivro(id: string) {
    console.log('Livro clicado:', id);
    this.livrosService.setData(id);
    this.navCtrl.navigateForward('infolivro');
  }

  ngOnInit() {}
}
