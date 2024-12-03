import { Component } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageBooksService } from 'src/app/services/storage-books/storage-books.service';

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
    private storage: StorageBooksService,
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
        this.storage.setUserID();
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
}
