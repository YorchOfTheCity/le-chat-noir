import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BackendService } from './services/backend.service';
import { MockBackendService } from './services/mockBackend.service';
import { DashboardComponent } from './dashboard/dashboard.component';

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
    BrowserAnimationsModule
  ],
  providers:  [
                { provide: BackendService, useClass: MockBackendService }, // TODO: Change to the real service when ready
              ],
  bootstrap:  [AppComponent]
})
export class AppModule { }
