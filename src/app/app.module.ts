import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BackendService } from './services/backend.service';
import { MockBackendService } from './services/mockBackend.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BACKEND_URL } from './tokens';
import { SessionService } from './services/session.service';

export const routes: Routes = [
  { path: '',         component: LoginComponent },
  { path: 'signUp',   component: SignUpComponent },
  { path: 'main',     component: DashboardComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpModule
  ],
  providers:  [
                BackendService,
                SessionService,
                { provide: BACKEND_URL, useValue: 'http://localhost:3000' }
              ],
  bootstrap:  [AppComponent]
})
export class AppModule { }
