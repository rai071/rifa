import { Component, Injectable, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { empty, Observable } from 'rxjs';
import { User } from '../security/login/user.model';
import { Router } from '@angular/router';
import { NotificationService } from '../messages/notification.service';



@Component({
  selector: 'app-rifas',
  templateUrl: './rifas.component.html',
  styleUrls: ['./rifas.component.css']
})

@Injectable()
export class RifasComponent implements OnInit {

  users = [
    { numero: '1', filme: 'Vingadores', email: '', flag: false },
    { numero: '2', filme: 'Tropa de Elite', email: 'rai071@github.com', flag: false },
    { numero: '3', filme: 'Star Wars', email: '', flag: false },
    { numero: '4', filme: 'Godzilla', email: '', flag: false }
  ];

  time = new Date();

  searchBarState = 'hidden';
  usuario: User = new User('', '');

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
    user.flag = !user.flag;
    this.notificationService = new NotificationService(this.router);
    const s = user.email;
    console.log(s);
    if (s) {
      const msg = `Número já selecionado`;
      this.notificationService.simpleAlert(msg);
    } else if (this.usuario.email) {
      user.email = this.usuario.email;
    } else {
      this.notificationService.alertConfirmation();
    }
  }
}
