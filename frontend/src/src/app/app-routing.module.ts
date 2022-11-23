import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmpoemsComponent } from './pages/abmpoems/abmpoems.component';
import { AbmusersComponent } from './pages/abmusers/abmusers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewpoemComponent } from './pages/newpoem/newpoem.component';
import { PoemsComponent } from './pages/poems/poems.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SingupComponent } from './pages/singup/singup.component';
import { AuthsessionGuard } from 'src/guards/authsession.guard';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';


const routes: Routes = [
  
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthsessionGuard]},
  { path: 'singup', component: SingupComponent},
  { path: 'newpoem', component: NewpoemComponent, canActivate: [AuthsessionGuard]},
  { path: 'abmpoems', component: AbmpoemsComponent, canActivate: [AuthsessionGuard]},
  { path: 'abmusers', component: AbmusersComponent, canActivate: [AuthsessionGuard]},
  { path: 'poem/:user/:id_poem', component: PoemsComponent},
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
