import { Component } from '@angular/core';
import { ChatsManagementService } from '../../services/chats-management.service';
import { ChatRoom } from '../../chat/chat.component';
import { SessionService } from '../../services/session.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-tabset-chat',
  templateUrl: './tabset-chat.component.html',
  styleUrls: ['./tabset-chat.component.scss']
})
export class TabsetChatComponent {

  chatRooms: ChatRoom[];

  constructor(private chatService: ChatsManagementService, private sessionService: SessionService, private socketService: SocketService) {
    this.chatRooms = [];
    this.initSubscriptions();
  }

  getChatRoom(contact: string): ChatRoom | undefined {
    // TODO: get chat room by roomName too.
    const chatRoom = this.chatRooms.filter( room => room.contacts.length === 1 && room.contacts[0] === contact);
    return chatRoom[0];
  }

  initSubscriptions() {
    this.chatService.createChatSubject.subscribe(
      (contacts) => {
        // TODO: If chat is with one person, check if chat is already open and focus it. Check if the user is online.
        if (contacts.length === 1) {
          const contact = contacts[0];
          let chatRoom = this.getChatRoom(contact);
          if ( chatRoom ) {
            // Room exists
            // TODO: Focus that room
          } else {
            // Room doesn't exist, create one
            // roomName: contact name plus 6 random digits.
            const roomName = this.sessionService.user.username + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
            chatRoom = {title: contact, contacts: [contact], roomName: roomName};
            this.chatRooms.push(chatRoom);
            // TODO how to get the room name? Get it from server?
            // TODO: Create room, trigger notifications to your contact to start chat.
          }
        } else {
          // Group chat... always create?
          // TODO: Create chat, focus and send invites to chat.
        }
      }
    );

    this.chatService.addToChatSubject.subscribe(
      contacts => {
        // TODO: Check if we can subscribe only in the focused chat... otherwise, check here which is
        // the active chat and add users.
      }
    );

    this.socketService.startChatRequest.subscribe( chatRoom => {
      this.chatRooms.push(chatRoom);
    });
  }
}
