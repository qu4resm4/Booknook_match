import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LivrosService } from '../../services/livros/livros.service';
import { StorageBooksService } from 'src/app/services/storage-books/storage-books.service';

@Component({
  selector: 'app-estante',
  templateUrl: './estante.page.html',
  styleUrls: ['./estante.page.scss'],
})
export class EstantePage implements OnInit {
  colecaoSelecionada: string = '-TODOS';
  livros: any[] = []; // Array com todos os livros do usuário
  livrosFiltrados: any[] = [];

  constructor(
    private navCtrl: NavController,
    private livrosService: LivrosService,
    private storage: StorageBooksService
  ) {
  }

  ngOnInit() {
    this.init()
  }

  // Executado toda vez que a página for exibida
  ionViewWillEnter() {
    this.carregarLivros(this.colecaoSelecionada);
  }

  async init() {
    this.livrosService.setAdd("bio");
  }

  async carregarLivros(estante: string) {
    this.livros = await this.storage.getTodos(estante);
  }

  redirecionandoInfoLivro(id: string) {
    console.log("estou sendo clicado livro")
    this.livrosService.setData(id);
    this.navCtrl.navigateForward('infolivro');
  }

  redirecionarBuscarLivro(){
    this.livrosService.setAdd("lib");
    this.navCtrl.navigateForward('pesquisar');
  }

  async favoritarLivro(livro: any) {
    await this.storage.adicionarNaEstante(livro, '-FAVORITOS')
    console.log("Favotiro sendo clicado")
  }

  async excluirLivro(livro: any, estante: string) {
    await this.storage.excluirDaEstante(livro, estante);
    this.carregarLivros(this.colecaoSelecionada);
  }
}