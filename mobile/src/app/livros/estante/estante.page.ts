import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LivrosService } from '../../services/livros/livros.service';

@Component({
  selector: 'app-estante',
  templateUrl: './estante.page.html',
  styleUrls: ['./estante.page.scss'],
})
export class EstantePage implements OnInit {
  colecaoSelecionada: string = 'todos';
  livros: any[] = []; // Array com todos os livros do usuário
  livrosFiltrados: any[] = [];

  constructor(
    private navCtrl: NavController,
    private livrosService: LivrosService
  ) {
    this.carregarLivros();
  }

  ngOnInit() {
    this.livrosService.setAdd("bio");
  }

  carregarLivros() {
    
  }

  filtrarColecao() {
    if (this.colecaoSelecionada === 'todos') {
      this.livrosFiltrados = this.livros;
    } else {
      this.livrosFiltrados = this.livros.filter(livro =>
        livro.colecao === this.colecaoSelecionada
      );
    }
  }

  abrirModalAdicionarLivro() {
    // Função para abrir modal de adição de livros
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
}