import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      console.log("isLogged no app componente: ", isLoggedIn)
      if (isLoggedIn) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}


/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
*/