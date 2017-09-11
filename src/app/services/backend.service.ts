import { Injectable, Inject, forwardRef } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { BACKEND_URL } from '../tokens';


@Injectable()
export class BackendService {

  constructor(private http: Http, @Inject(BACKEND_URL) private backEndURL: string) {
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

  saveUser(username: string, email: string, password: string) {
    const url = this.backEndURL + '/api/v1/user';
    // const options: RequestOptionsArgs = {params: {username, email, password}};
    const body = {username, email, password};
    return this.http.post(url, body);
  }
}

export class User {
  constructor(
    public username: string,
    public email: string
    ) {
  }
}

function getUsers(): User[] {
  return users.map(p => new User(p.username, p.email));
}

const users = [
  {username: 'yorch', email: 'yorch@tekmexico.com'},
  {username: 'angie', email: 'angie@tekmexico.com'},
];
