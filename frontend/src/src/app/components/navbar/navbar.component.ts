import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  admin = true;
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  get isToken() {
    return localStorage.getItem('token') || undefined;
 }

 get isAdmin() {
  let token = localStorage.getItem("token") || "";
  let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));

  return decodedJWT.admin
}
 
 cerrarSesion() {
  this.authService.logout();
}

}
