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
        this.router.navigate(['/home']);
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


/*
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'
import { HomePage } from 'src/app/match/home/home.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: string = '';
  email: string = '';
  password: string = '';
  isAuthenticated: boolean = false;
  userId: string = '';

  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router,
    private setHome: HomePage
  ) {}

  async login() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();

    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      await loading.dismiss();
      this.isAuthenticated = true;

      this.userId = userCredential.user?.uid || 'FALHA';
      if (this.userId === 'FALHA') {
        this.showToast('Falha na conexão, conecte-se novamente a conta');
      }
      await this.auth.setUserID(this.userId);
      console.log('UID do usuário:', this.userId);

      this.showToast('Login bem-sucedido');

      await this.router.navigate(['/home']);
    } catch (error) {
      await loading.dismiss();
      this.showToast('E-mail ou senha incorretos.');
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
*/