import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Rifa } from './rifa/rifa.model';

import { Observable } from 'rxjs';
import { RifasService } from './rifas.service';
import { User } from '../security/login/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rifas',
  templateUrl: './rifas.component.html',
  styleUrls: ['./rifas.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

export class RifasComponent implements OnInit {

  users = [
    { numero: '1', filme: 'Vingadores', email: '', flag: false },
    { numero: '2', filme: 'Tropa de Elite', email: '', flag: false },
    { numero: '3', filme: 'Star Wars', email: '', flag: false },
    { numero: '4', filme: 'Godzilla', email: '', flag: false }
  ];

  searchBarState = 'hidden';
  rifas: Rifa[];
  usuario: User = new User('', '');

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private router: Router) {
    if (localStorage.length > 0) {
      this.usuario = JSON.parse(localStorage.getItem('user'));
      console.log(localStorage);
    }
  }

  ngOnInit() {
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

  public selectUsers(event: any, user: any) {
    user.flag = !user.flag;

    if (this.usuario !== null && this.usuario.email !== '') {
      user.email = this.usuario.email;
    } else {
      this.router.navigateByUrl('login');
    }
  }

}
