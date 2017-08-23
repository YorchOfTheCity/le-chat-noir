import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';


let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let debugInstance;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule
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

});
