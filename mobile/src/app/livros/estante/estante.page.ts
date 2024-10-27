import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LivrosService } from '../../services/livros/livros.service';

@Component({
  selector: 'app-estante',
  templateUrl: './estante.page.html',
  styleUrls: ['./estante.page.scss'],
})
export class EstantePage implements OnInit {
  livros: any = [];
  tipoVisualizacao: any;

  constructor(
    private navCtrl: NavController,
    private livrosService: LivrosService
  ) { }

  redirecionandoInfoLivro(id: string) {
    console.log("estou sendo clicado livro")
    this.livrosService.setData(id);
    this.navCtrl.navigateForward('infolivro');
  }

  redirecionarBuscarLivro(){

  }

  alterarVisualizacao(){

  }

  ngOnInit() {
  }

}
