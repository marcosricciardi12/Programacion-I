import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  url = '127.0.0.1:5000/users'

  constructor(
    private httpClient: HttpClient
  ) { }
    
  getUsers() {
    const params = {"page":1, 
                    "per_page":20, 
                    "user": "", 
                    "poem_count": 0, 
                    "review_count": 0, 
                    "order_by": "user"};

    return this.httpClient.get(this.url, { params });
  }

}
