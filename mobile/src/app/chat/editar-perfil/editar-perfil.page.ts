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
    resenhas: '',
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
      // Verifique se userDoc é undefined antes de tentar acessar os dados
      try {
        const userDoc = await this.firestore.collection('users').doc(this.uid).get().toPromise();
        
        if (userDoc && userDoc.exists) { // Verifica se userDoc não é undefined e existe
          const data = userDoc.data();
          if (data) {
            this.perfil = data; // Agora 'data' é garantidamente um objeto
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
  
  // Método para salvar as alterações do perfil
  async salvarPerfil() {
    if (!this.uid) {
      console.error('UID não está definido. Não é possível salvar as alterações.');
      return;
    }

    try {
      // Atualiza os dados no Firestore
      await this.firestore.collection('users').doc(this.uid).update({
        username: this.perfil.username,
        email: this.perfil.email,
        biografia: this.perfil.biografia, // Salva a biografia
        resenhas: this.perfil.resenhas,   // Salva as resenhas
        updatedAt: new Date() // Atualiza a data de modificação
      });

      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Alterações salvas com sucesso!',
        buttons: ['OK']
      });
      await alert.present();

      // Após o alerta, redireciona para a página de perfil
      await alert.onDidDismiss(); // Aguarda o alerta ser fechado antes de redirecionar
      this.router.navigateByUrl('/perfil-usuario'); // Redireciona para "perfil-usuario"
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  }

  // Redireciona o usuário para a página de interesses
  irParaInteresses() {
    this.router.navigateByUrl('/interesses'); // Redireciona para a página de interesses
  }
}