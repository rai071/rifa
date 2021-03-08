import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/security/login/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;

  constructor(private router: Router) {
    this.user = new User('', '');
   }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('user')));
  }

  isLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user !== null && this.user !== undefined && this.user.email !== '') {
      return true;
    } else {
      return false;
    }
  }

  login() {
    this.router.navigateByUrl('login');
  }

  logout() {
    localStorage.clear();
    this.user = undefined;
    this.router.navigateByUrl('login');
  }
}
