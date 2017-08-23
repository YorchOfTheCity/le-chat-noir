import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';


let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let debugInstance;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents().then(
      () => {
        fixture = TestBed.createComponent(AppComponent);
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

  xit('should reject a wrong user/pwd combination', fakeAsync(() => {
    console.log('TODO');
  }));

  xit('should get to the chat page when users/pwd are correct', fakeAsync(() => {
    console.log('TODO');
  }));
});
