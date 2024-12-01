import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  uid: string | null = null;  // UID do usuário
  perfil: any = {            // Dados do perfil
    username: '',
    email: '',
    biografia: '',
    resenhas: [],   // Mantém um array de resenhas
    interests: []   // Alterado para ser um array de interesses
  };

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    this.uid = await this.authService.getCurrentUserId(); // Obtém o UID atual do usuário
  
    if (this.uid) {
      try {
        const userDoc = await this.firestore.collection('users').doc(this.uid).get().toPromise();
        if (userDoc && userDoc.exists) {
          const data = userDoc.data();
          if (data) {
            this.perfil = data; // Carrega os dados do perfil
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
  
  async salvarPerfil() {
    if (!this.uid) {
      console.error('UID não está definido. Não é possível salvar as alterações.');
      return;
    }
  
    try {
      await this.firestore.collection('users').doc(this.uid).update({
        username: this.perfil.username,
        email: this.perfil.email,
        biografia: this.perfil.biografia, // Atualiza apenas os campos relevantes
        updatedAt: new Date()
      });
  
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Alterações salvas com sucesso!',
        buttons: ['OK']
      });
      await alert.present();
  
      // Após o alerta, redireciona para a página de perfil
      await alert.onDidDismiss();
      this.router.navigateByUrl('/perfil-usuario');
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  }  
}