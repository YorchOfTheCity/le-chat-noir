import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { SocketService } from './socket.service';

@Injectable()
/** Holds the subjects that handle communication between contacts and tabset-chat for creating new chat windows  */
export class ChatsManagementService {

  // These subjects are used by the chat tabset to create chat components
  createChatSubject: Subject<string[]>;
  addToChatSubject: Subject<string[]>;

  constructor(private socketService: SocketService) {
    this.createChatSubject = new Subject();
    this.addToChatSubject = new Subject();
  }

}
