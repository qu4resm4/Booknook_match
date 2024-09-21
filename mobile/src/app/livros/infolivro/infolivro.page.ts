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

  constructor(private route: ActivatedRoute, private livrosService: LivrosService) {}

  ngOnInit() {
    //metodos para recuperar o id por parametro de rota
    const id = this.route.snapshot.paramMap.get('id');

    //chamando serviço
    this.livrosService.getLivrosbyId(id).subscribe(data => {
      console.log(data);  // Verifique os dados retornados
      this.livro = data;
    }, error => {
      console.error('Erro ao buscar os dados do livro:', error);
    });
  }

}
