import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  uid: string | null = null;  // UID do usuário
  perfil: any = {            // Dados do perfil
    username: '',
    email: '',
    biografia: '',
    interests: [], // Array para armazenar os interesses
    resenhas: []  // Array para armazenar as resenhas
  };

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    this.uid = await this.authService.getCurrentUserId(); // Obtém o UID atual do usuário
  
    if (this.uid) {
      // Carrega as informações do perfil e as resenhas
      try {
        const userDoc = await this.firestore.collection('users').doc(this.uid).get().toPromise();
        
        if (userDoc && userDoc.exists) { // Verifica se userDoc não é undefined e existe
          const data = userDoc.data();
          if (data) {
            this.perfil = data; // Agora 'data' é garantidamente um objeto
            // Carregar as resenhas associadas ao usuário
            const resenhasDoc = await this.firestore.collection('users').doc(this.uid).collection('resenhas').get().toPromise();
            
            if (resenhasDoc && !resenhasDoc.empty) { // Verifica se resenhasDoc não é undefined e contém documentos
              resenhasDoc.forEach((doc) => {
                const resenha = doc.data();
                this.perfil.resenhas.push(resenha); // Adiciona as resenhas
              });
            } else {
              console.log('Não há resenhas para este usuário.');
            }
          } else {
            console.error('O documento não contém dados!');
          }
        } else {
          console.error('Usuário não encontrado ou o documento não existe!');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
  }

  editarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }

  logout() {
    this.authService.logout(); // Chama o serviço de logout
  }
}
