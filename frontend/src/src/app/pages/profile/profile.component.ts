import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../assets/fonts/font-awesome.min.css',
              './profile.component.css',
      ]
})
export class ProfileComponent implements OnInit {
  user:any = "";
  email:any = "";
  admin:any = false;

  constructor() { }

  ngOnInit(): void {
    let token = localStorage.getItem("token") || "";
    if (token) {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      this.user = decodedJWT.user;
      this.email = decodedJWT.email;
      this.admin = decodedJWT.admin;
    }
  }

  get isAdmin() {
    let token = localStorage.getItem("token") || "";
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
  
    return decodedJWT.admin
  }

}
