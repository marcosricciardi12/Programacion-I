import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoemsService {

  url = "poems"

  constructor(private httpClient: HttpClient) { }

  getPoems() {
    return this.httpClient.get(this.url);
  }
}
