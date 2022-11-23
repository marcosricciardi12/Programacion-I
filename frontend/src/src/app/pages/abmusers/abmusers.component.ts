import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}


@Component({
  selector: 'app-abmusers',
  templateUrl: './abmusers.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css',
              '../../../assets/fonts/fontawesome-all.min.css',
              './abmusers.component.css'
]
})
export class AbmusersComponent implements OnInit {
  messsagePage:any = {};
  message:any = {};
  params:any = {};
  arrayUsuarios:any;
  paginacion:any = {};
  user: any;
  email:any;
  admin:any;
  user_id:any;
  editUserForm!: FormGroup;
  constructor(
    private router: Router,
    private userService: UsersService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getUsers(this.params);
    this.editUserForm = this.formBuilder.group({
      user: [''],
      email: [''],
      password: [''],
      password2: [''],
      admin: [false],
   });
  }

  getUsers(params: any){
    this.userService.getUsers(params).subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayUsuarios = data.users;
      this.paginacion.page = data.page;
      this.paginacion.pages = data.pages;
      console.log('Paginacion actual: ', this.paginacion);
    })
  }

  getUser(user_id:any) {
    this.userService.getUser(user_id).subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.user = data.user;
      this.user_id = data.id
      this.email = data.email
      this.admin = data.admin
      console.log(this.admin)
    });
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

  receiveMessageSearch($event: any) {
    this.message = $event
    if (this.message.value){
      this.params.user = this.message.value
      delete this.params.page
    // this.params.user_writer = this.message.value
    this.getUsers(this.params)
    }
    else {
      delete this.params.user
    // this.params.user_writer = this.message.value
    this.getUsers(this.params)
    }
    
  }

  receiveMessagePage($event: any) {
    this.messsagePage = $event
    if (this.messsagePage){
      this.params.page = this.messsagePage
    // this.params.user_writer = this.messsagePage.value
    this.getUsers(this.params)
    }
    else {
      delete this.params.page
    // this.params.user_writer = this.messsagePage.value
    this.getUsers(this.params)
    }
    
  }

  submitEditUser(user_id: any) {
    if (this.editUserForm.valid) {
      console.log(this.editUserForm.value);
      // console.log('Credenciales: ', {email, password});
      if (!this.editUserForm.value.user) {this.editUserForm.value.user = this.user}
      if (!this.editUserForm.value.email) {this.editUserForm.value.email = this.email}
      if (!this.editUserForm.value.admin) {this.editUserForm.value.admin = false}

      let user = this.editUserForm.value.user;
      this.user = this.editUserForm.value.user;
      let password = this.editUserForm.value.password;
      let password2 = this.editUserForm.value.password2;
      let email = this.editUserForm.value.email;
      this.email = this.editUserForm.value.email;
      let admin = this.editUserForm.value.admin;

      if (password == password2){
        if (password) {
          console.log('params edit user: ' , {user, password, email, admin})
          this.editUser({user, password, email, admin}, user_id);
        }
        else {
          console.log('params edit user: ' , {user, email, admin})
          this.editUser({user, email, admin}, user_id);
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Las contraseñas ingresadas no coinciden!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    }
    else{
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Formulario incompleto!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    }

    editUser(params:any, id: number) {
      this.userService.putUser(params, id).subscribe({
        next: async (rta) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario editado exitosamente',
            showConfirmButton: false,
            timer: 3000
          });
          await delay(3001);
          window.location.reload();
        }, error: async (error) =>{
  
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: ' No se pudo editar',
            showConfirmButton: false,
            timer: 3500
          });
          await delay(3500);
          console.log('error: ', error);
        }, complete: () => {
          console.log('Termino');
        }
      })
      
    }
}
