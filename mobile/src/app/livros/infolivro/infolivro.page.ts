import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivrosService } from '../../services/livros/livros.service';


@Component({
  selector: 'app-infolivro',
  templateUrl: './infolivro.page.html',
  styleUrls: ['./infolivro.page.scss'],
})
export class InfolivroPage implements OnInit {
  livro: any;
  showDescription: boolean = false;

  constructor(private route: ActivatedRoute, private livrosService: LivrosService) {}

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }
  
  ngOnInit() {
    //metodos para recuperar o id por parametro de rota
    const id = this.route.snapshot.paramMap.get('id');

    //chamando serviço
    this.livrosService.getLivrosbyId(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.livro = data;
    }, 
      error: (e) => {
        console.error('Erro ao buscar os dados do livro:', e);
    }});
  }

}
