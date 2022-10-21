import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { GetService } from './../../services/users/get.service'

@Component({
  selector: 'app-abmusers',
  templateUrl: './abmusers.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css',
              '../../../assets/fonts/fontawesome-all.min.css',
              '../../../assets/css/abm_users.css'
]
})
export class AbmusersComponent implements OnInit {
  arrayUsuarios:any;
  constructor(
    private router: Router,
    private getService: GetService
  ) { }

  ngOnInit(): void {
    
    this.getService.getUsers().subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayUsuarios = data.users;
    })
  }

}
