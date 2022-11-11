import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Methods': 'POST'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  url = 'auth/login'
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
  
  login(dataLogin:any): Observable<any> {
    //dataLogin = {email: 'email@gmail.com',password: '123456'};
    return this.httpClient
      .post(this.url , dataLogin, httpOptions)
      .pipe(take(1));
  }


  logout() {
    
    localStorage.removeItem('token');
    this.router.navigate(['/', 'home']);
    
  }

}
