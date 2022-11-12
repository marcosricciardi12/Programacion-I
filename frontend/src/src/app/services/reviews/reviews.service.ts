import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  url = "reviews"
  constructor(private httpClient: HttpClient) { }

  make_review(dataPoem: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return  this.httpClient.post(this.url, dataPoem, {headers: headers}).pipe(take(1));
  }
}
