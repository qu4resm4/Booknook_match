import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreService } from 'src/app/services/auth/firestore.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  perfil: any = {};

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPerfil();
  }

  // Carregar perfil atual do Firestore
  loadPerfil() {
    this.authService.getCurrentUserId().then(userId => {
      if (userId) {
        this.firestoreService.getPerfil(userId).subscribe(data => {
          this.perfil = data;
        });
      }
    });
  }

  // Função para salvar as alterações feitas no perfil
  salvarAlteracoes() {
    this.authService.getCurrentUserId().then(userId => {
      if (userId) {
        // Passe apenas o objeto 'perfil', sem o 'userId' aqui.
        this.firestoreService.updatePerfil(this.perfil).then(() => {
          console.log('Perfil atualizado com sucesso');
          this.router.navigate(['/perfil-usuario']); // Redireciona de volta para a tela de perfil
        }).catch(error => {
          console.error('Erro ao atualizar perfil', error);
        });
      }
    });
  }
}
