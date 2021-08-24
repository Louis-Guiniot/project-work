import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'progetto';

  private wowSubscription: Subscription;

  constructor(private router: Router, private wowService: NgwWowService) {

    // this.wowService.init();
  }

  ngOnInit() {
    // you can subscribe to WOW observable to react when an element is revealed
    AOS.init();
  }

  ngOnDestroy() {
    // unsubscribe (if necessary) to WOW observable to prevent memory leaks
    this.wowSubscription.unsubscribe();
  }

}
