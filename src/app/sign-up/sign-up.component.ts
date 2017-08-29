import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { DbService } from '../services/db.service';

let dbService: DbService;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  usernameMinLength = 4;
  passwordMinLength = 8;

  formModel: FormGroup;
  submitted = false;

  constructor(fb: FormBuilder, private databaseService: DbService) {
    dbService = databaseService;
    this.formModel = fb.group({
      'username': ['', [Validators.required, Validators.minLength(this.usernameMinLength)], this.userNotInDB],
      'email': ['', [Validators.required, Validators.email], this.emailNotInDB],
      'passwordsGroup': fb.group({
        'password': ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
        'pconfirm': ['', Validators.required]
      }, { validator: this.passwordMatch })
    });

    this.formModel.valueChanges.subscribe(data => {
      // Subscribing to the form to add breakpoints and debug changes in data:
      // console.dir(this.formModel.get('username'));
      // console.log(this.formModel.get('username').status);
      // console.log('Form changes', data);
    });
  }

  onSubmit() {
    this.submitted = true;
    // TODO: Store the users data.
  }

  // Validators
  passwordMatch(fg: FormGroup): ValidationErrors | null {
    const match = fg.get('password').value === fg.get('pconfirm').value;
    const result = match ? null : { 'passwordMatch': 'error' };
    return result;
  }

  userNotInDB(control: FormControl): Observable<any> {
    let username: string = control.value;
    username = username.toLocaleLowerCase();
    return dbService.getByUsername(username).map(user => user ? ({ userTaken : true }) : null );
  }

  emailNotInDB(control: FormControl): Observable<any> {
    let email: string = control.value;
    email = email.toLocaleLowerCase();
    const n = dbService.getByEmail(email).map(user => user ? ({ emailTaken : true }) : null );
    return n;
  }
}
