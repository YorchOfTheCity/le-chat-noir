import { Injectable, Inject } from '@angular/core';
import { SessionService } from './session.service';
import { BACKEND_URL_SOCKETS } from '../tokens';
import { Observable, Subject } from 'rxjs/Rx';

// Events object mirrored in backend
const EVENTS = {
  AUTHENTICATE : 'authenticate',
  USER_ONLINE : 'userOnline',
  USER_OFFLINE : 'userOffline',
  INVITE_REQUEST : 'inviteRequest',
  ACK_INVITE_RESULT : 'acknowledgeInviteResult',
};

@Injectable()
export class SocketService {

  public contactCameOnline: Subject<string>;
  public contactWentOffline: Subject<string>;

  public inviteAccepted: Subject<string>;
  public inviteRejected: Subject<string>;

  private socket: SocketIOClient.Socket;

  constructor(private session: SessionService, @Inject(BACKEND_URL_SOCKETS) private backEndURL: string) {
    this.contactCameOnline = new Subject<string>();
    this.contactWentOffline = new Subject<string>();
    this.inviteAccepted = new Subject<string>();
    this.inviteRejected = new Subject<string>();

    this.socket = io(backEndURL);
    this.socket.on('connect', () => {
      this.socket.emit(EVENTS.AUTHENTICATE, this.session.body);
    });

    this.socket.on(EVENTS.USER_ONLINE, (contactName) => {
      // console.log(`${contactName} is online`);
      this.contactCameOnline.next(contactName);
    });

    this.socket.on(EVENTS.USER_OFFLINE, (contactName) => {
      // console.log(`${contactName} is offline`);
      this.contactWentOffline.next(contactName);
    });

    this.socket.on(EVENTS.INVITE_REQUEST, (invite) => {
      console.log(`Invite received: ${invite}`);
      // TODO: Keep a list of invitations
    });
  }

  acknowledgeInviteResult(contactName: string) {
    this.socket.emit(EVENTS.ACK_INVITE_RESULT, contactName);
  }
}
