import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UsersService } from 'src/app/services/users/users.service';


@Component({
  selector: 'app-abmusers',
  templateUrl: './abmusers.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css',
              '../../../assets/fonts/fontawesome-all.min.css',
              './abmusers.component.css'
]
})
export class AbmusersComponent implements OnInit {
  arrayUsuarios:any;
  constructor(
    private router: Router,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayUsuarios = data.users;
    })
  }

  deleteUser(id: number) {
    console.log("HOLANDA")
    this.userService.deleteUser(id).subscribe();
    window.location.reload()
  }

}
