import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems/poems.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abmpoems',
  templateUrl: './abmpoems.component.html',
  styleUrls: ['./abmpoems.component.css',
              '../../../assets/bootstrap/css/bootstrap.min.css',
              '../../../assets/fonts/fontawesome-all.min.css',
]
})
export class AbmpoemsComponent implements OnInit {
  params:any = {own_poems: true};
  arrayPoems:any;
  constructor(
    private router: Router,
    private poemsService: PoemsService
  ) { }

  ngOnInit(): void {
    this.getPoems(this.params)
  }

  getPoems(params:any) {
    this.params = params
    console.log('Params: ', this.params);
    this.poemsService.getPoems(params).subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayPoems = data.poems;
    });
  }

  deletePoem(id: number) {
    console.log("HOLANDA")
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
        this.poemsService.deletePoem(id).subscribe();
        window.location.reload();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your poem has been deleted.',
          'success'
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

}
