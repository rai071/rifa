import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';

import locatePt from '@angular/common/locales/pt';

registerLocaleData(locatePt, 'pt')

import { ROUTES } from './app-routers';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RifasComponent } from './rifas/rifas.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './security/login/login.component';
import { UserDetailsComponent } from './header/user-details/user-details.component';
import { CadastroComponent } from './security/cadastro/cadastro.component';
import { InputComponent } from './messages/input/input.component';
import {RifasCartComponent} from './rifas/rifas-cart/rifas-cart.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RifasComponent,
    AboutComponent,
    HeaderComponent,
    LoginComponent,
    UserDetailsComponent,
    CadastroComponent,
    InputComponent,
    RifasCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
