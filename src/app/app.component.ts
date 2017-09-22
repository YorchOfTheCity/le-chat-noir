declare var Vivus: any;

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private session: SessionService) {}

  ngOnInit(): void {
    // Plain JS as the spinner was loaded outside of the angular app.
    document.getElementsByClassName('spinner')[0].outerHTML = '';

    // Check if there's a token in appStorage and login automatically
    if (localStorage.token) {
      // TODO: Cancel if it's expired
      this.session.initSession(JSON.parse(localStorage.token));
      this.router.navigate(['/main']);
    }
  }
}
