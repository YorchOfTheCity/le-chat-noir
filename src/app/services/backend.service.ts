import { Injectable, Inject, forwardRef } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { BACKEND_URL } from '../tokens';
import { SessionService } from './session.service';


@Injectable()
export class BackendService {

  constructor(private http: Http, @Inject(BACKEND_URL) private backEndURL: string, private session: SessionService) {
  }

  isUsernameAvailable(username: string): Observable<any> {
    const url = this.backEndURL + '/api/v1/userAvailable';
    const options: RequestOptionsArgs = {params: {username}};
    return this.http.get(url, options);
  }

  isEmailAvailable(email: string): Observable<any> {
    const url = this.backEndURL + '/api/v1/emailAvailable';
    const options: RequestOptionsArgs = {params: {email}};
    return this.http.get(url, options);
  }

  getLoginToken(username: string, password: string) {
    const loginUrl = this.backEndURL + '/api/v1/login';
    const options: RequestOptionsArgs = {params: {username, password}};
    return this.http.get(loginUrl, options);
  }

  getContacts() {
    const url = this.backEndURL + '/api/v1/secure/contacts';
    const headers = new Headers();
    headers.append('X-Access-Token', JSON.stringify(this.session.body));
    const options: RequestOptionsArgs = { headers };

    return this.http.get(url, options);
  }

  getInvitesSent() {
    const url = this.backEndURL + '/api/v1/secure/invites';
    const headers = new Headers();
    headers.append('X-Access-Token', JSON.stringify(this.session.body));
    const options: RequestOptionsArgs = { headers };

    return this.http.get(url, options);
  }

  saveUser(username: string, email: string, password: string) {
    const url = this.backEndURL + '/api/v1/user';
    // const options: RequestOptionsArgs = {params: {username, email, password}};
    const body = {username, email, password};
    return this.http.post(url, body);
  }

  inviteContact(nameOrEmail: string) {
    const url = this.backEndURL + `/api/v1/secure/contacts/invite/${nameOrEmail}`;
    // const options: RequestOptionsArgs = {params: {username, email, password}};
    const headers = new Headers();
    headers.append('X-Access-Token', JSON.stringify(this.session.body));
    const options: RequestOptionsArgs = { headers };

    return this.http.post(url, null, options);
  }
}

export class User {
  constructor(
    public name: string,
    public email: string
    ) { }
}
