import { Component } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  async login() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();

    try {
      const success = await this.authService.loginWithUsername(this.username, this.password);
      await loading.dismiss();

      if (success) {
        this.showToast('Login bem-sucedido');
        this.router.navigate(['tabs/match']);
      } else {
        this.showToast('Nome de usuário ou senha incorretos.');
      }
    } catch (error) {
      await loading.dismiss();
      this.showToast('Erro ao tentar login. Tente novamente.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  onImageLoad(event: Event): void {
    console.log('Imagem carregada com sucesso!', event);
    // Aqui você pode adicionar outras ações, como aplicar estilos ou fazer log.
  }

  onImageError(): void {
    console.log('Erro ao carregar a imagem!');
    // Aqui você pode definir uma imagem padrão de fallback ou outra ação.
  }
}
