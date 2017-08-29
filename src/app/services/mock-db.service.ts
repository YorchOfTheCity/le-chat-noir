import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from './db.service';
import { tick } from '@angular/core/testing';

@Injectable()
export class MockDbService {

  constructor() { }

  getByUsername(username: string): Observable<User> {
    // TODO: delay only while we have the mockup. Once the real service is done and the mockup is used only for testing
    // remove delay and use tick.
    tick(1000);
    return Observable.from(getUsers()).filter(u => u.username === username).defaultIfEmpty().delay(1000);
  }

  getByEmail(email: string): Observable<User> {
    // TODO: delay only while we have the mockup. Once the real service is done and the mockup is used only for testing
    // remove delay and use tick.
    tick(1000);
    return Observable.from(getUsers()).filter(u => u.email === email).defaultIfEmpty().delay(1000);
  }
}

function getUsers(): User[] {
  return users.map(p => new User(p.username, p.email));
}

const users = [
  {username: 'yorch', email: 'yorch@tekmexico.com'},
  {username: 'angie', email: 'angie@tekmexico.com'},
];
