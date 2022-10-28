import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PoemComponent } from './components/poem/poem.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { HttpClientModule } from "@angular/common/http";
import { PoemsService } from './services/poems/poems.service';
import { UsersService } from './services/users/users.service';
import { ReviewsService } from './services/reviews/reviews.service';
import { AbmpoemsComponent } from './pages/abmpoems/abmpoems.component';
import { AbmusersComponent } from './pages/abmusers/abmusers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewpoemComponent } from './pages/newpoem/newpoem.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReviewComponent } from './pages/review/review.component';
import { SingupComponent } from './pages/singup/singup.component';
import { UserComponent } from './components/user/user.component';
import { PagesComponent } from './components/pages/pages.component';

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
    AbmusersComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PoemsService, UsersService, ReviewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
