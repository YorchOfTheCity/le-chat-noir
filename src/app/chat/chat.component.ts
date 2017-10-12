import { Component, Input, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { SocketService } from '../services/socket.service';
import { SessionService } from '../services/session.service';
import { ChatRoom, Message, ChatState } from '../bootstrap/tabset-chat/tabset-chat.component';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements DoCheck {
  @Input() chatState: ChatState;
  previousMessagesLength;

  @ViewChild('modal')
  canvasComp: CanvasComponent;
  @ViewChild('chatWindow')
  chatWindow: ElementRef;

  showCanvas: boolean;
  /**
   * Component is being destroyed when bootstrap tabs change...
   * We changed info and socket logic in the parent tabcomponent...
   */
  constructor(private sessionService: SessionService, private socketService: SocketService) {
    this.previousMessagesLength = 0;
  }

  ngDoCheck(): void {
    // TODO: Make it so it scrolls only if it was previously at the bottom... otherwise the user is scrolling by himself and
    // should only get a hint that there are new messages.
    if ( this.previousMessagesLength !== this.chatState.messages.length ) {
      this.scrollChatToBottom();
      this.previousMessagesLength = this.chatState.messages.length;
    }
  }

  scrollChatToBottom() {
    // Setting a tick so that the angular changes are displayed first and the scroll occurs after that.
    // tick is not enough for images... we'll call this method again with  (load) = scrollChatToBottom() on the image.
    setTimeout( () => this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight, 0 );
  }

  sendScribble(data: string) {
    console.log('scribble being sent');
    this.sendMessage(data, true);
    this.showCanvas = false;
  }

  sendMessage(content: string, isDoodle?: boolean) {
    if (content.trim().length === 0) {
      return;
    }
    const message: Message = { chatRoomName: this.chatState.chatRoom.roomName,
      sender: this.sessionService.user.name, content: content, isDoodle: isDoodle};
    this.socketService.sendMessage(message);
    this.chatState.messages.push(message);
  }

  toggleCanvasComp() {
    this.showCanvas = !this.showCanvas;
  }
}
