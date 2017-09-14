import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Response, ResponseOptions, ResponseType, Request, Http } from '@angular/http';
import { MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from './backend.service';

@Injectable()
export class MockBackendService {

  constructor() { }

  getByUsername(username: string): Observable<User> {
    tick(1000);
    return Observable.from(getUsers()).filter(u => u.username === username).defaultIfEmpty();
  }

  getByEmail(email: string): Observable<User> {
    tick(1000);
    return Observable.from(getUsers()).filter(u => u.email === email).defaultIfEmpty();
  }

  getLoginToken(username: string, password: string) {
    if (username.toLowerCase() === 'yorch') {
      const response = {
        json() {
          return {
            // tslint:disable-next-line:max-line-length
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzIjoxNTA3MzI4MDQ1MzM3LCJ1c2VyIjp7Im5hbWUiOiJ5b3JjaCIsImVtYWlsIjoieW9yY2hAdGVrbWV4aWNvLmNvbSIsInB3ZEhhc2giOm51bGx9fQ.ixJmifCXt4SfgHoiQaaqi7PHbRnvPUEtO6tyUQoo5OI',
            expires: 1507328045337,
            user: {
              name: 'yorch',
              email: 'yorch@tekmexico.com',
              pwdHash: null
            }
          };
        }
      };
      return Observable.of(response);
    }
    const body = JSON.stringify({key: 'val'});
    const opts = {type: ResponseType.Error, status: 404, body: body};
    const responseOpts = new ResponseOptions(opts);
    // return this.connection.mockError(new MockError( responseOpts ));
    return null;
  }
}

function getUsers(): User[] {
  return users.map(p => new User(p.username, p.email));
}

class MockError extends Response implements Error {
  name: string;
  message: string;
}

const users = [
  { username: 'yorch', email: 'yorch@tekmexico.com', pwdHash: 'qwertyuiop' },
  { username: 'angie', email: 'angie@tekmexico.com', pwdHash: 'qwertyuiop' }
];
