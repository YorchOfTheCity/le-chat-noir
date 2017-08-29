import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { DbService } from '../services/db.service';
import { MockDbService } from '../services/mock-db.service';


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
    { provide: DbService, useClass: MockDbService },
  ]
})
export class CommonTestModule { }
