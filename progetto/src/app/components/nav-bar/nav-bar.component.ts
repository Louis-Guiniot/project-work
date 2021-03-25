import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }

  mieiTorneiUrl = '/miei-tornei'
  torneiUrl = '/tornei'
  loginUrl = '/login'
  signUpUrl = '/registrazione'
  homeUrl = '/home'
  
  ngOnInit(): void {
  }


  loggato(){
    //se getItem username non c'é non mostro logout se no si
    if(sessionStorage.getItem('username')!=null) return true;
    else return false;
  }

  logout(){
    sessionStorage.removeItem("username")
    this.router.navigateByUrl("/login")
  }

}
