import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      email: ['', Validators.required]
   });
  }
  register(dataLogin:any) {
    this.userService.createUser(dataLogin).subscribe({
      next: (rta) => {
        alert('Usuario ' + rta.user + ' creado exitosamente');
        this.router.navigate(['/abmusers']);
      }, error: (error) =>{
        alert('No se pudo crear el usuario');
        console.log('error: ', error);
      }, complete: () => {
        console.log('Termino');
      }
    })
  }


  submit() {
    if (this.registerForm.valid) {
        console.log(this.registerForm.value);
        let user = this.registerForm.value.user;
        let password = this.registerForm.value.password;
        let password2 = this.registerForm.value.password2;
        let email = this.registerForm.value.email;

        // console.log('Credenciales: ', {email, password});
        if (password == password2){
          this.register({user, password, email});
        }
        else {
          alert("Las contraseñas ingresadas no coinciden!")
        }
      }
      else{
        alert("Formulario invalido")
      }
    }  
}
