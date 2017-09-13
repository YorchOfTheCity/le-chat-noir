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
  initSession( json: {token: string, expiresMillis: number, user: User} ) {
    const {token, expiresMillis, user} = json;
    this.loggedIn = true;
    this.token = token;
    this.expires = new Date(expiresMillis);
    this.user = user;
    localStorage.setItem('token', JSON.stringify(json));
  }
}
