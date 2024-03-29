import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems/poems.service';
import Swal from 'sweetalert2';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-newpoem',
  templateUrl: './newpoem.component.html',
  styleUrls: ['./newpoem.component.css',
              '../../../assets/css/style.css']
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
      next: async (rta) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your poem ' + rta.title + ' has been published',
          showConfirmButton: false,
          timer: 3000
        });
        await delay(3001);
        this.router.navigate(['/home']);
      }, error: async (error) =>{
        console.log('Error es: ',error.error.msg)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: ' ' + error.error.msg + ' ',
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


  submit() {
    if (this.poemForm.valid) {
        let title = this.poemForm.value.title;
        let content = this.poemForm.value.content;
        this.register({title, content});
      }
      else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Missing data!'
          })
      }
    }  
}
