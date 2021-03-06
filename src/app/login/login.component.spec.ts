import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';

import { routes } from '../app.module';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LoginComponent } from './login.component';
import { CommonTestModule } from '../testing/common.test.module';

let comp: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let debugInstance;

describe('LoginComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonTestModule
      ]
    }).compileComponents().then(
      () => {
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;
        debugInstance = fixture.debugElement.componentInstance;
      }
      );
  }));

  it('should create the app', async(() => {
    expect(debugInstance).toBeTruthy();
    expect(comp).toBeTruthy();
  }));

  it(`should reject incomplete forms`, async(() => {

    comp.formModel.controls['username'].setValue('');
    comp.formModel.controls['password'].setValue('');

    const usernameInput = comp.formModel.get('username');
    const pwdInput = comp.formModel.get('password');

    expect(comp.formModel.invalid).toBeTruthy();
    expect(usernameInput.invalid).toBeTruthy();
    expect(pwdInput.invalid).toBeTruthy();
  }));

  it('form value should update from form changes', fakeAsync(() => {
    comp.formModel.controls['username'].setValue('testUser');
    comp.formModel.controls['password'].setValue('testPwd');

    expect(comp.formModel.value).toEqual({username: 'testUser', password: 'testPwd'});
  }));

  it('should accept a form with both fields filled', fakeAsync(() => {
    const usernameInput = comp.formModel.get('username');
    const pwdInput = comp.formModel.get('password');

    expect(comp.formModel.valid).toBeFalsy();
    expect(usernameInput.valid).toBeFalsy();
    expect(pwdInput.valid).toBeFalsy();

    comp.formModel.controls['username'].setValue('testUser');
    expect(comp.formModel.valid).toBeFalsy();
    expect(usernameInput.valid).toBeTruthy();
    expect(pwdInput.valid).toBeFalsy();

    comp.formModel.controls['username'].setValue('');
    comp.formModel.controls['password'].setValue('testPwd');
    expect(comp.formModel.valid).toBeFalsy();
    expect(usernameInput.valid).toBeFalsy();
    expect(pwdInput.valid).toBeTruthy();

    comp.formModel.controls['username'].setValue('testUser');
    expect(comp.formModel.valid).toBeTruthy();
    expect(usernameInput.valid).toBeTruthy();
    expect(pwdInput.valid).toBeTruthy();
  }));

  xit('should get to the chat page when users/pwd are correct', fakeAsync(() => {
    comp.formModel.controls['username'].setValue('yorch');
    comp.formModel.controls['password'].setValue('qwertyuiop');
    comp.onSubmit();
    expect(comp.incorrectCredentials).toBeFalsy();
  }));

  xit('should reject a wrong user/pwd combination', fakeAsync(() => {
    comp.formModel.controls['username'].setValue('yorchxxxc');
    comp.formModel.controls['password'].setValue('qwertyuiop');
    comp.onSubmit();
    expect(comp.incorrectCredentials).toBeTruthy();
  }));
});
