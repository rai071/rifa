import { Component, Injectable, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { empty, Observable } from 'rxjs';
import { User } from '../security/login/user.model';
import { Router } from '@angular/router';
import { NotificationService } from '../messages/notification.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-rifas',
  templateUrl: './rifas.component.html',
  styleUrls: ['./rifas.component.css']
})

@Injectable()
export class RifasComponent implements OnInit {

  LIMIT_SELECT_NUMBER = 3;

  users = [
    { numero: '1', filme: 'Vingadores', email: '', flag: false },
    { numero: '2', filme: 'Tropa de Elite', email: 'rai071@github.com', flag: false },
    { numero: '3', filme: 'Star Wars', email: '', flag: false },
    { numero: '4', filme: 'Godzilla', email: '', flag: false },
    { numero: '5', filme: 'Matrix', email: '', flag: false },
    { numero: '6', filme: 'John Wick', email: '', flag: false },
    { numero: '7', filme: 'Farofeiros', email: '', flag: false },
    { numero: '8', filme: 'Central do Brasil', email: '', flag: false }
  ];

  time = new Date();

  searchBarState = 'hidden';
  usuario: User = new User('', '', '');

  searchForm: FormGroup;
  searchControl: FormControl;

  notificationService: NotificationService;

  constructor(private router: Router) {
    if (localStorage.length > 0) {
      this.usuario = JSON.parse(localStorage.getItem('user'));
    }
  }

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  public selectUsers(event: any, user: any) {
    let count = 1;
    user.flag = !user.flag;
    this.notificationService = new NotificationService(this.router);
    const s = user.email;
    if (s) {
      if (s === this.usuario.email) {
        const msg = `Número já selecionado`;
        this.alertRemoverItemConfirmation(msg, user);
      } else {
        const msg = `Número já selecionado`;
        this.notificationService.simpleAlert(msg);
      }
    } else if (this.usuario.email) {
      this.users.forEach((x) => {
        if (x.email === this.usuario.email) {
          count++;
        }
      });
      if (count <= this.LIMIT_SELECT_NUMBER) {
        user.email = this.usuario.email;
      } else {
        const msg = `Limite máximo: ${this.LIMIT_SELECT_NUMBER}`;
        this.notificationService.simpleAlert(msg);
      }
    } else {
      this.notificationService.alertConfirmation();
    }
  }

  alertRemoverItemConfirmation(msg: string, user: any) {
    Swal.fire({
        title: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Remover',
        cancelButtonText: 'Fechar'
    }).then((result) => {
        if (result.value) {
          user.email = '';
        }
    });
}
}
