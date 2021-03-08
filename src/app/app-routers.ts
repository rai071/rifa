import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RifasComponent } from './rifas/rifas.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './security/login/login.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'rifas', component: RifasComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', component: HomeComponent }
];
