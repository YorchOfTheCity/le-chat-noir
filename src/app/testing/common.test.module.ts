import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { BackendService } from '../services/backend.service';
import { MockBackendService } from '../services/mockBackend.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterTestingModule
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
  ],
  providers:  [
    { provide: BackendService, useClass: MockBackendService },
  ]
})
export class CommonTestModule { }
