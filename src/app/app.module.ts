import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BackendService } from './services/backend.service';
import { MockBackendService } from './services/mockBackend.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BACKEND_URL } from './tokens';
import { SessionService } from './services/session.service';
import { ModalComponent } from './bootstrap/modal/modal.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TabsetSidebarComponent } from './bootstrap/tabset-sidebar/tabset-sidebar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '',         component: LoginComponent },
  { path: 'signUp',   component: SignUpComponent },
  { path: 'main',     component: DashboardComponent,  canActivate: [AuthGuardService] }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    ModalComponent,
    TabsetSidebarComponent,
    ContactsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers:  [
                BackendService,
                SessionService,
                AuthGuardService,
                { provide: BACKEND_URL, useValue: 'http://localhost:3000' },
              ],
  bootstrap:  [AppComponent]
})
export class AppModule { }
