import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Verifique o caminho do seu AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated) {  // Sem os parênteses, pois 'isAuthenticated' é uma propriedade
      return true;  // Permite o acesso à rota
    } else {
      this.router.navigate(['/login']);  // Redireciona para o login se não autenticado
      return false;  // Bloqueia o acesso
    }
  }
}
