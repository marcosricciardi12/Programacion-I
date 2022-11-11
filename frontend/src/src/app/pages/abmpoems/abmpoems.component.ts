import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems/poems.service';

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

}
