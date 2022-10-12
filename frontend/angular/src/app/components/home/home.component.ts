import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrayPoems = [
    {
      titulo: "Poema 1",
      autor: "Autor Poema 1",
      descripcion: "Descripcion Poema 1"
    },
    {
      titulo: "Poema 2",
      autor: "Autor Poema 2",
      descripcion: "Descripcion Poema 2"
    },
    {
      titulo: "Poema 3",
      autor: "Autor Poema 3",
      descripcion: "Descripcion Poema 3"
    },
    {
      titulo: "Poema 4",
      autor: "Autor Poema 4",
      descripcion: "Descripcion Poema 4"
    },
    {
      titulo: "Poema 5",
      autor: "Autor Poema 5",
      descripcion: "Descripcion Poema 5"
    },
    {
      titulo: "Poema 6",
      autor: "Autor Poema 6",
      descripcion: "Descripcion Poema 6"
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
