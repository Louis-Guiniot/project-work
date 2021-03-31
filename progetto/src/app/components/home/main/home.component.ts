import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  images = [
    {path:'./assets/carousel-img-1.png'},
    {path:'./assets/carousel-img-2.jpg'},
    {path:'./assets/carousel-img-3.jpg'},
  ]


  ngOnInit(): void {
  }

}
