import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LivrosService } from '../../services/livros/livros.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
  data: any;

  constructor(
    private loadingController: LoadingController,
    private livrosService: LivrosService
  ) {}

  async loadData() {
    const loading = await this.loadingController.create({
      duration: 5000,
      spinner: 'circular',
      cssClass: 'custom',
    });

    // Exibir o loading
    await loading.present();

    //algum livro será carregado sem necessidade de preencher o input? --> refatorar chamada do serviço

    // Chamada do serviço
    this.livrosService.getLivros().subscribe(
      (response) => {
        this.data = response;
        loading.dismiss();
        // Desativa o loading após o carregamento dos dados
      },
      (error) => {
        console.error('Erro ao carregar dados', error);
        //<----- ADICIONAR acionamento de modal com mensagem de erro de conexão
      }
    );
  }

  ngOnInit() {
    this.loadData();
  } 
}