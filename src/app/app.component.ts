declare var Vivus: any;
import 'jquery';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formModel: FormGroup;
  submitted = false;

  constructor() {
    this.formModel = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
      });
  }

  onSubmit() {
    this.submitted = true;
    console.log(`submitted is now: ${this.submitted}`);
    console.dir(this.formModel.value);
    console.log(`username is valid: ${this.formModel.get('username').valid}`);
    console.log(`username with get is valid: ${this.username.valid}`);
  }

  ngOnInit(): void {
    const useless: any = new Vivus('title-svg', { duration: 100 }, this.fillSVG);
  }

  fillSVG(): void {
    const transparency = .1;
    const timeout = 20;

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

  // Getters for easier validator syntax in template:
  get username() {return this.formModel.get('username'); }
  get password() {return this.formModel.get('password'); }
}
