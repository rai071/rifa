import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailsComponent } from 'src/app/header/user-details/user-details.component';
import { NotificationService } from 'src/app/messages/notification.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserDetailsComponent]
})
export class LoginComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  loginForm: FormGroup;
  usuario: User;

  notificationService: NotificationService;

  constructor(private formBuilder: FormBuilder, private router: Router, private userDetailsComponent: UserDetailsComponent) {
    this.usuario = new User('', '', '');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: this.formBuilder.control('', [Validators.required]),
    }, { validator: this.equalsTo });
  }

  equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const password = group.get('password');
    if (!email) {
      return undefined;
    }
    if (!password) {
      return undefined;
    }
    return undefined;
  }

  login() {
    this.notificationService = new NotificationService(this.router);
    if (this.loginForm.status === 'VALID') {
      this.usuario.email = this.loginForm.value.email;
      this.usuario.password = this.loginForm.value.password;
      if (this.usuario.email === 'rai@githib.com') {
        localStorage.setItem('user', JSON.stringify(this.usuario));
        this.router.navigateByUrl('rifas');
        this.userDetailsComponent.isLoggedIn();
      } else {
        this.notificationService.alertNovoCadastroConfirmation();
      }
    } else {
      const msg = `Preencha os campos`;
      this.notificationService.simpleAlert(msg);
    }
  }
}
