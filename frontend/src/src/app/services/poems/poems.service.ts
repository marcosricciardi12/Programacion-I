import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoemsService {

  url = "poems"
  url_i = "poem"

  constructor(private httpClient: HttpClient) { }
  
  getPoems(params:any) {
    let auth_token = localStorage.getItem('token');
    if (auth_token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      });
      return this.httpClient.get(this.url, {params: params, headers: headers});
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.httpClient.get(this.url, {params: params, headers: headers});
    }
    
  }
  
  createPoem(dataPoem: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return  this.httpClient.post(this.url, dataPoem, {headers: headers}).pipe(take(1));
  }

  deletePoem(id: number) {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return  this.httpClient.delete(this.url_i + "/" + id.toString(), {headers: headers});
  }

  getPoem(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return  this.httpClient.get(this.url_i + "/" + id.toString(), {headers: headers});
  }
}
