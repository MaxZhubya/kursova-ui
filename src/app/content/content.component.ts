import { Component, OnInit, OnDestroy } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  isWelcomeVisible: boolean = true;

  constructor(public router: Router) {

    router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (e.url.endsWith('/') || e.url.endsWith('\\'))
          this.isWelcomeVisible = true;
        else
          this.isWelcomeVisible = false;
      }
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
