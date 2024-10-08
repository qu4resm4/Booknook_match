import { Component, OnInit } from '@angular/core';
import { PerfisService } from '../../services/perfis/perfis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  perfis: any[] = [];

  constructor(
    private router: Router,
    private PerfisService: PerfisService
  ) { }

  getPerfis(){
    //chamando API
    this.PerfisService.getPerfis().subscribe({
      next: (data: any) => {
        //carregando os dados
        this.perfis = data;
        console.log("sucesso JSON");
        console.log(this.perfis);
      },
      error: (e) => {
        console.error('Erro ao carregar dados', e);
      }
    }
    );
  }

  async redirecionandoFiltro() {
    await this.router.navigate(['/filtro']);
  }

  async redirecionandoPerfil() {
    await this.router.navigate(['/perfil-usuario']);
  }

  ngOnInit() {
    this.getPerfis()
  }

}
