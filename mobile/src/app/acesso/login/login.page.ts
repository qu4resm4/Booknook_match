import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string = '';
  password: string = '';

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.auth.login(this.user, this.password));
  }

}
