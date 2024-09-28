import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LivrosService } from '../../services/livros/livros.service';


@Component({
  selector: 'app-infolivro',
  templateUrl: './infolivro.page.html',
  styleUrls: ['./infolivro.page.scss'],
})
export class InfolivroPage implements OnInit {
  id: string = '';
  livro: any;
  showDescription: boolean = false;

  constructor(
    private livrosService: LivrosService,
    private loadingController: LoadingController
  ) {}

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  aoIniciar(){
    //metodos para recuperar o id pelo serviço
    this.id = this.livrosService.getData();

    //chamando serviço
    this.livrosService.getLivrosbyId(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.livro = data;
    }, 
      error: (e) => {
        console.error('Erro ao buscar os dados do livro:', e);
    }});
  }
  
  ngOnInit() {
    this.aoIniciar();
  }

}
