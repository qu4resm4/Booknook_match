import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage {
  user: string = ''; // Nome de usuário
  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async register() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      await loading.dismiss();

      this.showToast('Cadastro efetuado com sucesso!');

      // Salvar o nome de usuário no local storage (ou na base de dados, dependendo do setup)
      localStorage.setItem('username', this.user);

      // Redireciona para login
      this.router.navigate(['/login']);
    } catch (error) {
      await loading.dismiss();
      this.showToast('Erro no cadastro. Verifique as informações inseridas.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
