import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { BackendService } from '../services/backend.service';

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
  success = false;

  constructor(fb: FormBuilder, private db: BackendService) {
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
    if (this.formModel.valid) {

      this.db.saveUser(this.formModel.get('username').value
                        , this.formModel.get('email').value
                        , this.formModel.get('passwordsGroup').get('password').value)
              .toPromise().then(
                (response) => {
                  // On fulfilled
                  if (response.json().success) {
                    // TODO: Success message and send to login screen or log in and send to dashboard
                    console.log('success in inserting user');
                    this.success = true; // for modal messages

                  }
                },
                (error) => {
                  // on reject
                  // TODO: Error message
                  console.log('error' + error);
                  this.success = false;
                }
              );
    }
  }

  // Validators
  passwordMatch(fg: FormGroup): ValidationErrors | null {
    const match = fg.get('password').value === fg.get('pconfirm').value;
    const result = match ? null : { 'passwordMatch': 'error' };
    return result;
  }

  // We use an arrow function, otherwise the validators lose the this reference and the db service.
  userNotInDB = (control: FormControl): Observable<any> => {
    let username: string = control.value;
    username = username.toLocaleLowerCase();
    return this.db.isUsernameAvailable(username).map(
      res => {
        return res.json().available ? null : ({ userTaken : true });
      });
  }

  emailNotInDB = (control: FormControl): Observable<any> => {
    let email: string = control.value;
    email = email.toLocaleLowerCase();
    return this.db.isEmailAvailable(email).map(
      res => {
        return res.json().available ? null : ({ emailTaken : true });
      });
  }
}
