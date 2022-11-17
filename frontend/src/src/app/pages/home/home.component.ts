import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems/poems.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message:any = {};
  messsagePage:any = {};
  arrayPoems:any;
  params:any = {};
  actual_page:any = 1;
  pages:any = 1;
  paginacion:any = {};
  constructor(
    private router: Router,
    private poemsService: PoemsService,
  ) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token") || "";
    if(token) {
      if (this.tokenExpired(token)) {
        localStorage.removeItem('token');
      }
    }
    this.params.page = 1;
    this.getPoems(this.params)
    

  }

  get isToken() {
    return localStorage.getItem('token') || undefined;
 }

 get isAdmin() {
  let token = localStorage.getItem("token") || "";
  let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));

  return decodedJWT.admin
}

  getPoems(params:any) {
    this.params = params;
    
    console.log('Params: ', this.params);
    this.poemsService.getPoems(params).subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayPoems = data.poems;
      this.paginacion.page = data.page;
      this.paginacion.pages = data.pages;
      console.log('Paginacion actual: ', this.paginacion);
    });

  }

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }


  receiveMessageSearch($event: any) {
    this.message = $event
    delete this.params.page
    if (this.message.value){
      this.params.title = this.message.value
    // this.params.user_writer = this.message.value

    this.getPoems(this.params)
    }
    else {
      delete this.params.title
    // this.params.user_writer = this.message.value
    this.getPoems(this.params)
    }
    
  }

  receiveMessagePage($event: any) {
    this.messsagePage = $event
    if (this.messsagePage){
      this.params.page = this.messsagePage
    // this.params.user_writer = this.messsagePage.value
    this.getPoems(this.params)
    }
    else {
    // this.params.user_writer = this.messsagePage.value
    this.getPoems(this.params)
    }
    
  }

}
