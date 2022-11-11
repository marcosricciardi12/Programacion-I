import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  

  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
       user: ['', Validators.required],
       password: ['', Validators.required]
    });
  }

  login(dataLogin:any) {
    console.log('Comprobando credenciales...');
    this.authService.login(dataLogin).subscribe({
      next: (rta) => {
        alert('Login Exitoso');
        localStorage.setItem('token',rta.access_token);
        this.router.navigate(['/', 'home']);
      }, error: (error) =>{
        alert('Credenciales incorrectas');
        console.log('error: ', error);
        localStorage.removeItem('token');
      }, complete: () => {
        console.log('Termino');
      }
    })
  }


  submit() {
    if (this.loginForm.valid) {
        console.log(this.loginForm.value);
        let user = this.loginForm.value.user;
        let password = this.loginForm.value.password;

        // console.log('Credenciales: ', {email, password});
        this.login({user, password});
      }
      else{
        alert("Formulario invalido")
      }
    }  
}
