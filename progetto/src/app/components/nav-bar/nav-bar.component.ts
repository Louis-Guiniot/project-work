import { Component, HostListener, OnInit } from '@angular/core';
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
  profiloUrl = '/profilo'
  isScrolling = false;
  innerWidth: any;
  isMobile = false;
  isToggle = true;

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.isScrolling = true;
    var top = window.pageYOffset || document.documentElement.scrollTop
    if (top == 0) {
      this.isScrolling = false
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 500) {
      this.isToggle = true;
    } else {
      this.isToggle = true;
    }
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 500) {
      this.isToggle = true;
    } else {
      this.isToggle = true;
    }
    console.log(this.isToggle)
  }

  openMenu() {
    this.isToggle = false

  }

  closeMenu() {
    this.isToggle = true
  }

  toggle() {
    this.isToggle = this.isToggle ? false : true
    console.log(this.isToggle)
  }


  loggato() {
    //se getItem username non c'é non mostro logout se no si
    if (sessionStorage.getItem('utente') != null) return true;
    else return false;
  }

  logout() {
    sessionStorage.removeItem("utente")
    this.router.navigateByUrl("/login")
  }

}
