import { Component, OnInit, Output, EventEmitter, Input, ViewChild, TemplateRef } from '@angular/core';

import { Contact } from '../../contacts/contacts.component';
import { Observable } from 'rxjs/Rx';
import { SocketService } from '../../services/socket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Invite {
  name: string; // The inviter
  contact: string; // that's the current user
  accept?: boolean;
}

@Component({
  selector: 'app-modal-invites',
  templateUrl: './modal-invites.component.html',
  styleUrls: ['./modal-invites.component.scss']
})
export class ModalInvitesComponent implements OnInit {
  @ViewChild('content')
  content: TemplateRef<any>;

  // Change contacts so it reflects in the contacts component.
  @Input() contacts: Contact[];
  @Input() pendingInvites: boolean;
  @Output() pendingInvitesChange: EventEmitter<boolean> = new EventEmitter();

  invites: Invite[];

  constructor(private modalService: NgbModal, private socketService: SocketService) {
      this.invites = [];
      socketService.inviteRequest.subscribe( (invite) => {
        this.invites.push(invite);
        this.pendingInvitesChange.emit(true);
      });
  }

  ngOnInit() {
  }

  open() {
    this.modalService.open(this.content).result.then((result) => {},
    (reason) => {});
  }

  acceptInvite(invite: Invite) {
    // Remove from invites, Turn into contact, send ack to backend.
    this.invites.splice(this.invites.indexOf(invite), 1);
    this.contacts.push( {name: invite.name } );
    this.socketService.acceptInvite(invite);
    if (this.invites.length === 0) {
      this.pendingInvitesChange.emit(false);
    }
    // Backend should check if contact is online and emit events if so.
  }

  rejectInvite(invite: Invite) {
    // Remove from invites, send ack to backend.
    this.invites.splice(this.invites.indexOf(invite), 1);
    this.socketService.rejectInvite(invite);
    if (this.invites.length === 0) {
      this.pendingInvitesChange.emit(false);
    }
  }

  // testClick() {
  //   this.pendingInvitesChange.emit(true);
  //   this.contacts[0].name = 'Whatever';
  //   console.log('debug point');
  // }
}
