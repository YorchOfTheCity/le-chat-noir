import { Component, Input, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { SocketService } from '../services/socket.service';
import { SessionService } from '../services/session.service';
import { ChatRoom, Message, ChatState } from '../bootstrap/tabset-chat/tabset-chat.component';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {
  @Input() chatState: ChatState;
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
  }

  ngAfterViewChecked(): void {
    // Setting a tick so that the image is displayed first and the scroll occurs after that.
    setTimeout( () => this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight, 0);
  }

  sendScribble(data: string) {
    console.log('scribble being sent');
    this.sendMessage(data, true);
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
