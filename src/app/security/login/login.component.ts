import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailsComponent } from 'src/app/header/user-details/user-details.component';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserDetailsComponent]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usuario: User;
  constructor(private fb: FormBuilder, private router: Router, private userDetailsComponent: UserDetailsComponent) {
    this.usuario = new User('', '');
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }

  login() {
    if (this.loginForm.status === 'VALID') {
      this.usuario.email = this.loginForm.value.email;
      this.usuario.password = this.loginForm.value.password;
      localStorage.setItem('user', JSON.stringify(this.usuario));
      this.router.navigateByUrl('rifas');
      this.userDetailsComponent.isLoggedIn();
    }
  }
}
