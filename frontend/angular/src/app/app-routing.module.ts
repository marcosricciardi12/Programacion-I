import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReviewComponent } from './components/review/review.component';
import { SingupComponent } from './components/singup/singup.component';
import { NewpoemComponent } from './components/newpoem/newpoem.component';
import { AbmpoemsComponent } from './components/abmpoems/abmpoems.component';
import { AbmusersComponent } from './components/abmusers/abmusers.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'review', component: ReviewComponent},
  { path: 'singup', component: SingupComponent},
  { path: 'newpoem', component: NewpoemComponent},
  { path: 'abmpoems', component: AbmpoemsComponent},
  { path: 'abmusers', component: AbmusersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
