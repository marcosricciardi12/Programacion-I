import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  url = "reviews"
  url_i = "review"
  constructor(private httpClient: HttpClient) { }

  make_review(dataReview: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return  this.httpClient.post(this.url, dataReview, {headers: headers}).pipe(take(1));
  }

  deleteReview(id: number) {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return  this.httpClient.delete(this.url_i + "/" + id.toString(), {headers: headers});
  }
}
