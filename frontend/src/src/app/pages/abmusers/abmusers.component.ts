import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-abmusers',
  templateUrl: './abmusers.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css',
              '../../../assets/fonts/fontawesome-all.min.css',
              './abmusers.component.css'
]
})
export class AbmusersComponent implements OnInit {
  message:any = {};
  params:any = {};
  arrayUsuarios:any;
  constructor(
    private router: Router,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getUsers(this.params);
  }

  getUsers(params: any){
    this.userService.getUsers(params).subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayUsuarios = data.users;
    })
  }

  deleteUser(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe();
        window.location.reload();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    
  }

  receiveMessage($event: any) {
    this.message = $event
    if (this.message.value){
      this.params.user = this.message.value
    // this.params.user_writer = this.message.value
    this.getUsers(this.params)
    }
    else {
      delete this.params.user
    // this.params.user_writer = this.message.value
    this.getUsers(this.params)
    }
    
  }

}
