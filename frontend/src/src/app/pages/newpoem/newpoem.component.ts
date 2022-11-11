import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems/poems.service';

@Component({
  selector: 'app-newpoem',
  templateUrl: './newpoem.component.html',
  styleUrls: ['../../../assets/css/style.css']
})
export class NewpoemComponent implements OnInit {
  poemForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private poemService: PoemsService
  ) { }

  ngOnInit(): void {
    this.poemForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
   });
  }
  register(dataPoem:any) {
    this.poemService.createPoem(dataPoem).subscribe({
      next: (rta) => {
        alert('Poema' + rta.title + ' creado exitosamente');
        this.router.navigate(['/home']);
      }, error: (error) =>{
        alert('No se pudo crear el poema');
        console.log('error: ', error);
      }, complete: () => {
        console.log('Termino');
      }
    })
  }


  submit() {
    console.log(this.poemForm.value);
    if (this.poemForm.valid) {
        console.log(this.poemForm.value);
        let title = this.poemForm.value.title;
        let content = this.poemForm.value.content;
        this.register({title, content});
      }
      else{
        alert("Formulario invalido")
      }
    }  
}
