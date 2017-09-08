import { Injectable } from '@angular/core';
import { User } from './backend.service';



@Injectable()
export class SessionService {
  loggedIn: boolean;
  token: string;
  expires: Date;
  user: User;

  constructor() { }

  /**
   *
   * @param response.json from backend login.
   */
  initSession( {token, expiresMillis, user}: {token: string, expiresMillis: number, user: User}) {
    this.loggedIn = true;
    this.token = token;
    this.expires = new Date(expiresMillis);
    this.user = user;
  }
}
