import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BackendService {

  constructor() { }

  getByUsername(username: string): Observable<User> {
    throw new Error('Operation not yet implemented');
  }

  getByEmail(email: string): Observable<User> {
    throw new Error('Operation not yet implemented');
  }
}

export class User {
  constructor(
    public username: string,
    public email: string
    ) {
  }
}
