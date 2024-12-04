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

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private livrosService: LivrosService
  ) {}

  getImagem(link: string): string {
    if(link == 'sem') {
      return 'assets/imgs/capa.jpg'
    }
    let link_seguro = link.replace("http", "https")
    return link_seguro;
  }
  

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

        loading.dismiss();
      },
      error: (e) => {
        console.error('Erro ao carregar dados', e);
        loading.dismiss();
      },
    });
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
