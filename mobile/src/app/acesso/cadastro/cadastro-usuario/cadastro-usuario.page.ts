import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  async register() {
    const loading = await this.loadingController.create({
      message: 'Cadastrando...',
    });
    await loading.present();

    try {
      // Chama o método de registro e aguarda a conclusão
      const registrationResult = await this.authService.register(this.username, this.email, this.password);

      // Confirma se o registro foi bem-sucedido
      if (registrationResult) {
        await loading.dismiss();
        this.showToast('Cadastro realizado com sucesso');
        
        // Realiza login após o registro e redireciona para o tutorial
        const loginResult = await this.authService.loginWithUsername(this.username, this.password);
        if (loginResult) {
          await this.router.navigate(['/tutorial']);
        } else {
          this.showToast('Erro ao realizar login após o cadastro.');
        }
      }
    } catch (error) {
      console.error('Erro no processo de cadastro:', error);
      await loading.dismiss();
      this.showToast('Erro ao cadastrar. Tente novamente.');
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
