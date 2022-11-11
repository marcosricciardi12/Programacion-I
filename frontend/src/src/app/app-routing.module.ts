import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmpoemsComponent } from './pages/abmpoems/abmpoems.component';
import { AbmusersComponent } from './pages/abmusers/abmusers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewpoemComponent } from './pages/newpoem/newpoem.component';
import { PoemsComponent } from './pages/poems/poems.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReviewComponent } from './pages/review/review.component';
import { SingupComponent } from './pages/singup/singup.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'review', component: ReviewComponent},
  { path: 'singup', component: SingupComponent},
  { path: 'newpoem', component: NewpoemComponent},
  { path: 'abmpoems', component: AbmpoemsComponent},
  { path: 'abmusers', component: AbmusersComponent},
  { path: 'poem', component: PoemsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
