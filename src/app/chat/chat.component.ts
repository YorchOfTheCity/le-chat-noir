import { Component, OnInit, Input } from '@angular/core';

import { SocketService } from '../services/socket.service';
import { ChatsManagementService } from '../services/chats-management.service';
import { Subject } from 'rxjs/Rx';

// Mirrored in backend
export interface ChatRoom {
  title: string;
  owner?: string; // Owner will be set in the backend (avoid attack?)
  // TODO: further security: should check the users invited are indeed contacts, otherwise they could chat with someone else
  contacts: string[];
  roomName: string;
}

export interface Message {
  sender: string;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chatRoom: ChatRoom;

  constructor(private socketService: SocketService) {
    this.socketService.startChat(this.chatRoom);
  }

  ngOnInit() {

  }

}
