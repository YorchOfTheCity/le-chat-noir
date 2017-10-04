import { Component } from '@angular/core';
import { ChatsManagementService } from '../../services/chats-management.service';
import { SessionService } from '../../services/session.service';
import { SocketService } from '../../services/socket.service';

export class ChatState {
  constructor(public chatRoom: ChatRoom, public messages?: Message[]) {
    if (!this.messages) {
      this.messages = [];
    }
  }
}

// Mirrored in backend
export interface ChatRoom {
  title: string; // What will be displayed in the tab
  owner: string; // Owner should also be checked in the backend (avoid attack?)
  // TODO: further security: should check the users invited are indeed contacts, otherwise they could chat with someone else
  contacts: string[];
  roomName: string; // Used to differentiate between rooms
}

// Mirrored in backend
export interface Message {
  chatRoomName: string;
  sender: string;
  content: string;
  isDoodle?: boolean; // check doodle logic.
}

@Component({
  selector: 'app-tabset-chat',
  templateUrl: './tabset-chat.component.html',
  styleUrls: ['./tabset-chat.component.scss']
})
export class TabsetChatComponent {

  openChats: ChatState[];

  constructor(private chatService: ChatsManagementService, private sessionService: SessionService, private socketService: SocketService) {
    this.openChats = [];
    this.initSubscriptions();
  }

  getChatState(contact: string): ChatState | undefined {
    // TODO: get chat room by roomName too.
    const chatRoom = this.openChats.filter(({ chatRoom: room }) => room.contacts.length === 1 && room.contacts[0] === contact);
    return chatRoom[0];
  }

  initSubscriptions() {
    this.chatService.createChatSubject.subscribe(
      (contacts) => {
        // TODO: If chat is with one person, check if chat is already open and focus it. Check if the user is online.
        let chatState: ChatState;
        if (contacts.length === 1) {
          const contact = contacts[0];
          chatState = this.getChatState(contact);
          if (chatState) {
            // Room exists
            // TODO: Focus that room
            return;
          }
        }
          // Room doesn't exist, create one
          // roomName: contact name plus 6 random digits.
          const roomName = this.sessionService.user.name + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
          const title = contacts.length === 1 ? contacts[0] : this.sessionService.user.name + ' et al';
          chatState = new ChatState({ title: title, owner: this.sessionService.user.name, contacts: contacts, roomName: roomName });
          this.openChats.push(chatState);
          // Send the invites
          this.socketService.startChat(chatState.chatRoom);

          // Subscribe to messages to this chat
          this.socketService.messagesSubject
            .filter(message => message.chatRoomName === chatState.chatRoom.roomName)
            .subscribe(message => {
              chatState.messages.push(message);
            });
          // TODO how to get the room name? Get it from server?
          // TODO: Create room, trigger notifications to your contact to start chat.
      }
    );

    this.chatService.addToChatSubject.subscribe(
      contacts => {
        // TODO: Check if we can subscribe only in the focused chat... otherwise, check here which is
        // the active chat and add users.
      }
    );

    this.socketService.startChatRequest.subscribe(chatRoom => {
      if (chatRoom.contacts.length === 1) {
        // 1 on one chat... change the title to the owner of the chat
        chatRoom.title = chatRoom.owner;
      }
      const chatState = new ChatState(chatRoom);
      this.openChats.push(chatState);
      // Subscribe to messages to this chat
      this.socketService.messagesSubject
        .filter(message => message.chatRoomName === chatState.chatRoom.roomName)
        .subscribe(message => {
          chatState.messages.push(message);
        });
    });
  }
}
