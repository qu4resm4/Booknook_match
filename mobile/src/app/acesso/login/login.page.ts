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
  email: string = '';
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
      // Realiza o login através do AuthService e salva token e uid
      await this.authService.login(this.email, this.password);
      await loading.dismiss();

      // Exibe a mensagem de sucesso e redireciona
      this.showToast('Login bem-sucedido');
    } catch (error) {
      await loading.dismiss();
      console.log("ERRO AO LOGAR: ", error)
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