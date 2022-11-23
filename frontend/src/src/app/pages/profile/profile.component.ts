import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../assets/fonts/font-awesome.min.css',
              './profile.component.css',
      ]
})
export class ProfileComponent implements OnInit {
  user_id:any = "";
  user:any = "";
  email:any = "";
  admin:any = false;
  editForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      user: [''],
      email: [''],
      password: [''],
      password2: ['']
   });
    let token = localStorage.getItem("token") || "";
    if (token) {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      this.user_id = decodedJWT.id;
      this.getUser(this.user_id);
    }

  }

  get isAdmin() {
    let token = localStorage.getItem("token") || "";
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    return decodedJWT.admin
  }

  getUser(user_id:any) {
    this.userService.getUser(user_id).subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.user = data.user;
      this.email = data.email
    });
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

  submitEdit(user_id: any) {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      // console.log('Credenciales: ', {email, password});
      if (!this.editForm.value.user) {this.editForm.value.user = this.user}
      if (!this.editForm.value.email) {this.editForm.value.email = this.email}
      if (!this.editForm.value.admin) {this.editForm.value.admin = false}

      let user = this.editForm.value.user;
      this.user = this.editForm.value.user;
      let password = this.editForm.value.password;
      let password2 = this.editForm.value.password2;
      let email = this.editForm.value.email;
      this.email = this.editForm.value.email;
      let admin = this.editForm.value.admin;

      if (password == password2){
        if (password) {
          console.log('params edit user: ' , {user, password, email, admin})
          this.editUser({user, password, email, admin}, this.user_id);
        }
        else {
          console.log('params edit user: ' , {user, email, admin})
          this.editUser({user, email, admin}, this.user_id);
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

}
