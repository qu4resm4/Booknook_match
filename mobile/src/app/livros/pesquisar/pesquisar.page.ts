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

    if(this.query.trim() === '') {
      loading.dismiss();
      return;
    }

    this.livrosService.getLivros(this.query).subscribe({
      next: (data: any) => {
        this.livros = data.items;
        this.totalImages = this.livros.length; // Atualiza o número total de imagens esperadas
        this.imagesLoaded = 0; // Reinicia o contador de imagens carregadas
      },
      error: (e) => {
        console.error('Erro ao carregar dados', e);
        loading.dismiss();
      }
    });
  }

  onImageLoad() {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.totalImages) {
      // Desativa o loader somente quando todas as imagens tiverem sido carregadas
      this.loadingController.dismiss();
    }
  }


  redirecionandoInfoLivro(id: string) {
    console.log("estou sendo clicado livro")
    this.livrosService.setData(id);
    this.navCtrl.navigateForward('infolivro');
  }

  ngOnInit() {
  }
}
