import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems/poems.service';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-abmpoems',
  templateUrl: './abmpoems.component.html',
  styleUrls: ['./abmpoems.component.css',
              '../../../assets/bootstrap/css/bootstrap.min.css',
              '../../../assets/fonts/fontawesome-all.min.css',
]
})
export class AbmpoemsComponent implements OnInit {
  editForm!: FormGroup;
  messsagePage:any = {};
  user:any = "";
  user_id:any = "";
  params:any = {own_poems: true};
  arrayPoems:any;
  paginacion:any = {};
  title:any = "";
  content:any = "";
  poem_id:any ;
  constructor(
    private router: Router,
    private poemsService: PoemsService,
    private userService: UsersService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
   });
    let token = localStorage.getItem("token") || "";
    if (token) {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      this.user = decodedJWT.user
      this.user_id = decodedJWT.id
    }
    this.getPoems(this.params)
  }

  getPoemsUser(id:any) {
    this.userService.getUser(id).subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayPoems = data.poems;
    });
  }

  getPoems(params:any) {
    this.params = params
    console.log('Params: ', this.params);
    this.poemsService.getPoems(params).subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayPoems = data.poems;
      this.paginacion.page = data.page;
      this.paginacion.pages = data.pages;
    });
  }

  deletePoem(id: number) {
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
      icon: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.poemsService.deletePoem(id).subscribe();
        window.location.reload();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your poem has been deleted.',
          'Success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your poem is safe :)',
          'error'
        )
      }
    })
    
  }

  receiveMessagePage($event: any) {
    this.messsagePage = $event
    if (this.messsagePage){
      this.params.page = this.messsagePage
    // this.params.user_writer = this.messsagePage.value
    this.getPoems(this.params)
    }
    else {
      delete this.params.page
    // this.params.user_writer = this.messsagePage.value
    this.getPoems(this.params)
    }
    
  }

  getPoem(id: number) {
    console.log('valores form', this.editForm.value)
    this.poemsService.getPoem(id).subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.title = data.title;
      this.content = data.content;
      this.poem_id = id,
      this.editForm.value.title = data.title;
      this.editForm.value.content = data.content;
      console.log('valores form', this.editForm.value)
    });
    
  }

  editPoem(params:any, id: number) {
    this.poemsService.putPoem(params, id).subscribe({
      next: async (rta) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your poem has been edited',
          showConfirmButton: false,
          timer: 3000
        });
        await delay(3001);
        window.location.reload();
      }, error: async (error) =>{

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: ' Your poem could not be edited',
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

  submitEdit(poem_id: any) {
    console.log('valores form', this.editForm.value)
    if (this.editForm.valid) {
        let title = this.editForm.value.title;
        let content = this.editForm.value.content;

        this.editPoem({title, content}, poem_id);
      }
      else{
        if(this.editForm.value.title) {
          this.editPoem({title: this.editForm.value.title}, poem_id);
        }
        if(this.editForm.value.content) {
          this.editPoem({content: this.editForm.value.content}, poem_id);
        }

      }
    }


}
