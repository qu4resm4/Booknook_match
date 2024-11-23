import { Component, OnInit } from '@angular/core';
import { PerfisService } from '../../services/perfis/perfis.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreService } from 'src/app/services/auth/firestore.service'; 
import { Perfil } from 'src/app/models/perfil.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userId: string= ''
  perfis: any[] = [];
  limit = 5; // Define o número de itens por página

  constructor(
    private router: Router,
    private PerfisService: PerfisService,
    private authService: AuthService,
    private fire: FirestoreService
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

  loadMore() {
    this.fire.getUsers(this.limit).subscribe((newUsers: Perfil[]) => {
      // Filtra os usuários para remover os objetos vazios
      const filteredUsers = newUsers.filter(user => Object.keys(user).length > 0);
  
      // Adiciona os novos usuários (filtrados) à lista existente
      this.perfis = [...this.perfis, ...filteredUsers];
      console.log(this.perfis);
    });
  }
  

  async redirecionandoFiltro() {
    await this.router.navigate(['/filtro']);
  }

  async redirecionandoPerfil() {
    await this.router.navigate(['/perfil-usuario']);
  }

  ngOnInit() {
    this.loadMore();
  /*this.getPerfis();*/
  }

}