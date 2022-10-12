import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PoemComponent } from './components/poem/poem.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { PagesComponent } from './components/pages/pages.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReviewComponent } from './components/review/review.component';
import { SingupComponent } from './components/singup/singup.component';
import { NewpoemComponent } from './components/newpoem/newpoem.component';
import { AbmpoemsComponent } from './components/abmpoems/abmpoems.component';
import { AbmusersComponent } from './components/abmusers/abmusers.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    PoemComponent,
    SearchbarComponent,
    PagesComponent,
    ProfileComponent,
    ReviewComponent,
    SingupComponent,
    NewpoemComponent,
    AbmpoemsComponent,
    AbmusersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
