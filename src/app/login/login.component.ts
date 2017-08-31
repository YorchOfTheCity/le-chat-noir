declare var Vivus: any;
import 'jquery';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('splashScreen', [
      state('inactive' , style({ opacity: 0, transform: 'translateX(-100%)' })),
      state('active', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('inactive<=>active', animate('1000ms ease-out'))
    ]),
    // trigger('loginWindow', [
    //   /* Hardcoded the translation since it has problems with the CSS class (.centered),
    //    * a better option would be to use pure CSS and just change the class with ngClass
    //    * */
    //   state('inactive' , style({ transform: 'translate(-50%, -150%)' })),
    //   state('active', style({ transform: 'translate(-50%, -50%)' })),
    //   transition('inactive<=>active', animate('1000ms ease-out'))
    // ]),
  ],
})

export class LoginComponent implements OnInit, AfterContentInit {

  formModel: FormGroup;
  submitted = false;
  state = 'inactive';
  centeringAnimation = 'framedAbove';

  constructor(private router: Router, private db: BackendService) {
    this.formModel = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
      });
  }

  onSubmit() {
    this.submitted = true;
    // TODO: If the form is valid, check for username/pwd and fwd to main chat screen

    this.router.navigate(['/main']);
  }

  ngOnInit(): void {
    const useless: any = new Vivus('title-svg', { duration: 200 }, this.fillSVG);
  }

  ngAfterContentInit(): void {
    this.state = 'active';
    this.centeringAnimation = 'framedAnim';
  }

  fillSVG(): void {
    const transparency = .1;
    const timeout = 30;

    // Can't seem to be able to loop neither with css transitions nor jquery's animate, will do it by hand.
    (function loop(trans) {
      document.getElementById('title-cn').style.fill = 'rgba(10,10,10,' + trans + ')';
      document.getElementById('title-hat-oir').style.fill = 'rgba(253,20,20,' + trans + ')';
      if (trans < 1) {
        setTimeout(function () {
          loop(trans + .1);
        }, timeout);
      }
    })(transparency);
  }

  toggleMove() {
    console.log('click');
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
  }

  // Getters for easier validator syntax in template:
  get username() {return this.formModel.get('username'); }
  get password() {return this.formModel.get('password'); }
}
