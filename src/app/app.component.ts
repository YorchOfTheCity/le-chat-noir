declare var Vivus: any;

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Plain JS as the spinner was loaded outside of the angular app.
    document.getElementsByClassName('spinner')[0].outerHTML = '';

    // Check if there's a token in appStorage and login automatically
    if (localStorage.token) {
      this.router.navigate(['/main']);
    }
  }
}
