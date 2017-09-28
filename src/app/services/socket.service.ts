import { Injectable, Inject } from '@angular/core';
import { SessionService } from './session.service';
import { BACKEND_URL_SOCKETS } from '../tokens';
import { Observable, Subject } from 'rxjs/Rx';
import { Invite } from '../bootstrap/modal-invites/modal-invites.component';
import { ChatRoom, Message } from '../chat/chat.component';

// Events object mirrored in backend
const EVENTS = {
  AUTHENTICATE : 'authenticate',
  USER_ONLINE : 'userOnline',
  USER_OFFLINE : 'userOffline',
  INVITE_REQUEST : 'inviteRequest',
  // tslint:disable-next-line:max-line-length
  ACK_INVITE_RESULT : 'acknowledgeInviteResult', // For the inviter to acknowledge that his invite was accepted/canceled (and delete invite from db)
  INVITE_RESPONSE: 'inviteResponse', // To accept/reject invite.
  START_CHAT: 'startChat'
};

@Injectable()
export class SocketService {

  public contactCameOnline: Subject<string>;
  public contactWentOffline: Subject<string>;

  public inviteAccepted: Subject<string>;
  public inviteRejected: Subject<string>;

  public inviteRequest: Subject<Invite>;

  public startChatRequest: Subject<ChatRoom>;

  private socket: SocketIOClient.Socket;

  constructor(private session: SessionService, @Inject(BACKEND_URL_SOCKETS) private backEndURL: string) {
    this.contactCameOnline = new Subject<string>();
    this.contactWentOffline = new Subject<string>();
    this.inviteAccepted = new Subject<string>();
    this.inviteRejected = new Subject<string>();
    this.inviteRequest = new Subject<Invite>();
    this.startChatRequest = new Subject<ChatRoom>();

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

    this.socket.on(EVENTS.INVITE_REQUEST, (invite: Invite) => {
      this.inviteRequest.next(invite);
    });

    // A contact accepted/rejected the users invite while the user's online
    this.socket.on(EVENTS.INVITE_RESPONSE, (invite: Invite) => {
      if (invite.accept) {
        this.inviteAccepted.next(invite.contact);
      }else {
        this.inviteRejected.next(invite.contact);
      }
    });

    this.socket.on(EVENTS.START_CHAT, (chatRoom: ChatRoom) => {
      this.startChatRequest.next(chatRoom);
    });
  }

  /**
   *
   * @param contactName The user that sent the invite
   */
  acknowledgeInviteResult(contactName: string) {
    this.socket.emit(EVENTS.ACK_INVITE_RESULT, contactName);
  }

  acceptInvite(invite: Invite) {
    invite.accept = true;
    this.socket.emit(EVENTS.INVITE_RESPONSE, invite);
  }

  rejectInvite(invite: Invite) {
    invite.accept = false;
    this.socket.emit(EVENTS.INVITE_RESPONSE, invite);
  }

  startChat(chatRoom: ChatRoom) {
    this.socket.emit(EVENTS.START_CHAT, chatRoom);
  }
}
