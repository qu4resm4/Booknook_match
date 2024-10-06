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

  async getLivros(){
    //configurações do componente loader
    const loading = await this.loadingController.create({
      spinner: 'circular',
      cssClass: 'custom',
    });
  
    //exibindo loader
    await loading.present();
    //verificando se a pesquisa está vazio
    if(this.query.trim() === '') {
      //desativando o loader
      loading.dismiss();
      return;
    }

    //fazendo a pesquisa na API
    this.livrosService.getLivros(this.query).subscribe({
      next: (data: any) => {
        //carregando os dados
        this.livros = data.items;
        //desativando o loader
        loading.dismiss();
      },
      error: (e) => {
        console.error('Erro ao carregar dados', e);
        loading.dismiss();
        //exibe o modal de erro
        /*this.modalErro();*/
      }
    }
    );
  }

  redirecionandoInfoLivro(id: string) {
    console.log("estou sendo clicado livro")
    this.livrosService.setData(id);
    this.navCtrl.navigateForward('infolivro');
  }

  ngOnInit() {
  } 
}