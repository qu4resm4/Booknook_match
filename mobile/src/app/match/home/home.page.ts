import { Component, QueryList, ViewChildren, AfterViewInit, OnInit } from '@angular/core';
import { PerfisService } from '../../services/perfis/perfis.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreService } from 'src/app/services/auth/firestore.service'; 
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilmodalComponent } from "../perfilmodal/perfilmodal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userId: string= ''
  perfis: any[] = [];
  limit = 5; // Define o número de itens por página
  @ViewChildren(PerfilmodalComponent) perfilModals!: QueryList<PerfilmodalComponent>; // Acessa todos os app-perfilmodal
  modalCount: number = 0;  // Contador de modais exibidos

  constructor(
    private router: Router,
    private PerfisService: PerfisService,
    private authService: AuthService,
    private fire: FirestoreService
  ) { }

  
  // Executado toda vez que a página for exibida
  /*
  ionViewWillEnter() {
    this.loadMore();
  }
*/
  /*getPerfis(){
    //chamando JSON fake
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
  }*/

  loadMore() {
    this.fire.getUsers(this.limit).subscribe((newUsers: Perfil[]) => {
      // Filtra os usuários para remover os objetos vazios
      const filteredUsers = newUsers.filter(user => Object.keys(user).length > 0);
  
      // Adiciona os novos usuários (filtrados) à lista existente
      this.perfis = [...this.perfis, ...filteredUsers];
      console.log(this.perfis);
    });
  }

  ngAfterViewInit() {
    this.executeAction();
  }

  onPerfilModalChange(isVisible: boolean) {
    if (isVisible) {
      this.modalCount++;  // Incrementa quando um perfil modal é exibido
    } else {
      this.modalCount--;  // Decrementa quando um perfil modal é removido
    }
    console.log('Total de PerfilModals na tela:', this.modalCount);

    // Se não houver nenhum perfil modal, execute a ação desejada
    if (this.modalCount === 0) {
      console.log('Nenhum PerfilModal na tela!');
      this.executeAction();
      // Aqui você pode chamar uma função para realizar uma ação
    }
  }

  executeAction() {
    console.log('Nenhum PerfilModal está sendo exibido.');
    this.loadMore();
  }
  

  async redirecionandoFiltro() {
    await this.router.navigate(['/filtro']);
  }

  async redirecionandoPerfil() {
    await this.router.navigate(['/perfil-usuario']);
  }

  ngOnInit() {
    /*this.loadMore();*/
  /*this.getPerfis();*/
  }

}