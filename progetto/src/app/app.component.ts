import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'progetto';


  pages = [
    {path:'/home',label: 'Home'},
    {path:'/profile',label: 'Profilo'},
    {path:'/tornei',label: 'Tornei'},
    {path:'/miei-tornei',label: 'I miei tornei'},
    {path:'/login',label: 'Login'},
  ]

}
