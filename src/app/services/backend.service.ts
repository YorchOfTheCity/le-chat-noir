import { Injectable, Inject, forwardRef } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { BACKEND_URL } from '../tokens';


@Injectable()
export class BackendService {

  constructor(private http: Http, @Inject(BACKEND_URL) private backEndURL: string) {
  }

  getByUsername(username: string): Observable<User> {
    return Observable.from(getUsers()).filter(u => u.username === username).defaultIfEmpty().delay(1000);
  }

  getByEmail(email: string): Observable<User> {
    return Observable.from(getUsers()).filter(u => u.email === email).defaultIfEmpty().delay(1000);
  }

  getLoginToken(username: string, password: string) {
    const loginUrl = this.backEndURL + '/login';
    const options: RequestOptionsArgs = {params: {username, password}};
    return this.http.get(loginUrl, options);
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
