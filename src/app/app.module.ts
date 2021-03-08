import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ROUTES } from './app-routers';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RifasComponent } from './rifas/rifas.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { RifaComponent } from './rifas/rifa/rifa.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RifasComponent,
    AboutComponent,
    HeaderComponent,
    RifaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
