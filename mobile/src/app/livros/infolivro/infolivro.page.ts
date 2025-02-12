import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LivrosService } from '../../services/livros/livros.service';
import { StorageBooksService } from 'src/app/services/storage-books/storage-books.service';

@Component({
  selector: 'app-infolivro',
  templateUrl: './infolivro.page.html',
  styleUrls: ['./infolivro.page.scss'],
})
export class InfolivroPage implements OnInit {
  id: string = '';
  livro: any;
  showDescription: boolean = false;
  btnAdd: string = '';

  constructor(
    private navCtrl: NavController,
    private livrosService: LivrosService,
    private storage: StorageBooksService
  ) {}

  getImagem(link: string): string {
    if(link == 'sem') {
      return 'assets/imgs/capa.jpg'
    }
    let link_seguro = link.replace("http", "https")
    return link_seguro;
  }

  async adicionarEstante(id: string, title: string, thumb: string) {
    const livro = {
      "id": id,
      "title": title,
      "thumbnail": thumb
    };
    console.log(livro);
    await this.storage.adicionarNaEstante(livro, '-TODOS');
    this.navCtrl.navigateForward('tabs/estante', { queryParams: {
      add: true
    }});
  }
  
  async adicionarResenha() {
    this.navCtrl.navigateForward('bio', {
      queryParams: {
        livro: JSON.stringify(this.livro) // Passa o livro para a página de resenha
      }
    });
  }
  
  redirecionandoVoltar() {
    this.livrosService.setData('');
    this.navCtrl.navigateForward('tabs/estante');
  }

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  aoIniciar(){
    this.id = this.livrosService.getData();
    this.btnAdd = this.livrosService.getAdd();

    this.livrosService.getLivrosbyId(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.livro = data;
      }, 
      error: (e) => {
        console.error('Erro ao buscar os dados do livro:', e);
      }
    });
  }
  
  ngOnInit() {
    this.aoIniciar();
  }
}
