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
 
 cerrarSesion() {
  this.authService.logout();
}

}
