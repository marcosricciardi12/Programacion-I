import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems/poems.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrayPoems:any;
  constructor(
    private router: Router,
    private poemsService: PoemsService
  ) { }

  ngOnInit(): void {
    this.poemsService.getPoems().subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayPoems = data.poems;
    })
  }

  

}
