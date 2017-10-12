import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, HttpModule, XHRBackend } from '@angular/http';

import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { BackendService } from '../services/backend.service';
import { MockBackendService } from '../services/mockBackend.service';
import { SessionService } from '../services/session.service';
import { routes } from '../app.module';
import { BACKEND_URL } from '../tokens';



@NgModule({
  // declarations: [
  //   LoginComponent,
  //   SignUpComponent,
  //   DashboardComponent,
  // ],
  // imports: [
  //   CommonModule,
  //   ReactiveFormsModule,
  //   RouterTestingModule.withRoutes(routes),
  //   HttpModule
  // ],
  // providers:  [
  //   SessionService,
  //   BackendService,
  //   { provide: BACKEND_URL, useValue: 'http://localhost:3000' },
  //   { provide: XHRBackend, useClass: MockBackend },
  // ]
})
export class CommonTestModule { }
