import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';
import { UserDetailsComponent } from 'src/app/header/user-details/user-details.component';
import { NotificationService } from 'src/app/messages/notification.service';
import { User } from '../login/user.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [UserDetailsComponent]
})
export class CadastroComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  numberPattern = /^[0-9]*$/;

  cadastroForm: FormGroup;

  usuario: User;

  notificationService: NotificationService;

  constructor(private router: Router, private formBuilder: FormBuilder, private userDetailsComponent: UserDetailsComponent) {
    this.usuario = new User('', '', '');
  }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: this.formBuilder.control('', Validators.required),
      passwordConfirmation: this.formBuilder.control('', Validators.required)
    }, { validator: this.equalsTo });
  }

  equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }
    if (emailConfirmation.value !== '') {
      if (email.value !== emailConfirmation.value) {
        return { emailsNotMatch: true };
      }
    }
    if (!password || !passwordConfirmation) {
      return undefined;
    }
    if (passwordConfirmation.value !== '') {
      if (password.value !== passwordConfirmation.value) {
        return { passwordsNotMatch: true };
      }
    }
    return undefined;
  }

  novoUsuario() {
    this.notificationService = new NotificationService(this.router);
    if (this.cadastroForm.status === 'VALID') {
      this.usuario.nome = this.cadastroForm.value.name.split(' ', 1)[0];
      this.usuario.email = this.cadastroForm.value.email;
      this.usuario.password = this.cadastroForm.value.password;
      localStorage.setItem('user', JSON.stringify(this.usuario));
      this.router.navigateByUrl('rifas');
      this.userDetailsComponent.isLoggedIn();
    }
  }

}
