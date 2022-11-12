import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems/poems.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import Swal from 'sweetalert2';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.css']
})
export class PoemsComponent implements OnInit {
  poem_id:any;
  reviewForm!: FormGroup;
  title:any;
  arrayReview:any;
  content:any;
  post_date:any;
  poem_user:any;
  poem!: {user: string, id_poem: string};
  constructor(
    private rutaActiva: ActivatedRoute,
    private poemsService: PoemsService,
    private reviewService: ReviewsService,
    private formBuilder: FormBuilder,
    private router: Router,
    
    ) { }

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      mark: ['', Validators.required],
      comment: ['', Validators.required]
   });
    this.poem = {
      user: this.rutaActiva.snapshot.params['user'],
      id_poem: this.rutaActiva.snapshot.params['id_poem']
    };
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.poem.id_poem = params['id_poem'];
        this.poem.user = params['user'];
      }
    );
    console.log(this.poem.id_poem, this.poem.user)
    this.poemsService.getPoem(this.poem.id_poem).subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayReview = data.reviews;
      this.title = data.title;
      this.content = data.content;
      this.post_date = data.post_date
      this.poem_user = this.poem.user
      this.poem_id = this.poem.id_poem
    });
  }
  get User() {
    let token = localStorage.getItem("token") || "";
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
  
    return decodedJWT.user
  }
  
  make_review(dataReview:any) {
    this.reviewService.make_review(dataReview).subscribe({
      next: async (rta) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tu review ha sido publicada',
          showConfirmButton: false,
          timer: 3000
        });
        await delay(3001);
        window.location.reload();
      }, error: async (error) =>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo publicar tu review',
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

  submit(poem_id: any) {
    if (this.reviewForm.valid) {
        console.log(this.reviewForm.value);
        let mark = this.reviewForm.value.mark;
        let comment = this.reviewForm.value.comment;

        this.make_review({mark, comment, poem_id});
      }
      else{
        alert("Formulario invalido")
      }
    }

  }
