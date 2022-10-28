import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'users'
  url_i = 'users'
  constructor(private httpClient: HttpClient) { }
    
  getUsers() {
    return this.httpClient.get(this.url);
  }

  deleteUser(id: number) {
    // let heads = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Authorization', 'Bearer ' + token)
    return this.httpClient.delete(this.url_i + "/" + id.toString());
  }

}
