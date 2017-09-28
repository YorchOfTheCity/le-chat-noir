import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SessionService } from '../services/session.service';
import { BackendService } from '../services/backend.service';
import { ModalComponent } from '../bootstrap/modal/modal.component';
import * as io from 'socket.io-client';
import { BACKEND_URL_SOCKETS } from '../tokens';
import { SocketService } from '../services/socket.service';
import { ChatsManagementService } from '../services/chats-management.service';

export interface Contact {
  name: string;
  isSelected?: boolean;
  isOnline?: boolean;
  isInvitePending?: boolean;
  isInviteAccepted?: boolean;
  isInviteRejected?: boolean;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  // TODO: Listen for users that connect, add icon for online/offline status, move online users to the top
  contacts: Contact[];
  pendingInvites = false;

  @ViewChild('modal')
  modal: ModalComponent;

  constructor(private db: BackendService, private session: SessionService, private socketService: SocketService,
    private chatService: ChatsManagementService) {
    // setDummyData.call(this);
    this.initSocketObservers();
  }

  ngOnInit() {
    const contactsP = this.db.getContacts().toPromise();
    const invitesP = this.db.getInvitesSent().toPromise();

    Promise.all([contactsP, invitesP]).then(
      ( [contactsResponse, invitesResponse]) => {
      this.contacts = contactsResponse.json();
      // TODO: Add invites to contacts
      const invites = invitesResponse.json();
      invites.forEach(invite => {
        const contact: Contact = { name: invite.contact };
        if (invite.accept === undefined) {
          contact.isInvitePending = true;
          this.contacts.push( contact );
        }else if (invite.accept) {
          // TODO: If invite accepted while offline (this case) then there's already a contact with that name
          // need to change its isInviteAccepted and don't push another one.
          for (let i = 0; i <= this.contacts.length; i++) {
            if (this.contacts[i].name === contact.name) {
              this.contacts[i].isInviteAccepted = true;
            }
          }
        }else {
          contact.isInviteRejected = true;
          this.contacts.push( contact );
        }
      });
    },
    (err) => {
      console.log('Error!');
      console.dir(err);
      // TODO: Error handling
    });
  }

  inviteContact(contact: string) {
    console.log(`contact input is ${contact}`);
    this.db.inviteContact(contact).toPromise().then( (res) => {
      // TODO: Add contact to current contacts
      // check if reply of 'contact already exists'
      const json = res.json();
      if (json.name) {
        this.contacts.push( { name: json.name, isInvitePending: true } );
        this.setModal('Invite sent', 'You\'ll be notified when the user accepts your invitation' );
      }else {
        // Message from server
        // modal?
        if (json.message) {
          this.setModal('Error', json.message);
        }
      }
      console.log('got contact:');
      console.dir(res);

    },
    (err) => {
      console.log('Error!');
      console.dir(err);
      // TODO: Error handling
    });
  }

  openChat() {
    if (this.contacts.filter( contact => contact.isSelected && !contact.isOnline).length > 0 ) {
      // Don't trigger chat if offline users were selected
      this.modal.title = 'Can\'t open chat';
      this.modal.body = 'You can only start chats with online users, please only select online users';
      this.modal.buttons = [];
      this.modal.open();
      return;
    }
    // Trigger an event so that the tabsetchat creates a new chat
    this.chatService.createChatSubject.next(
      this.contacts.filter(contact => contact.isSelected)
      .map(contact => contact.name)
    );
  }

  addToChat() {
    if (this.contacts.filter( contact => contact.isSelected && !contact.isOnline).length > 0 ) {
      // Don't trigger chat if offline users were selected
      this.modal.title = 'Can\'t add to chat';
      this.modal.body = 'You can only add online users to an ongoing chat, please only select online users';
      this.modal.buttons = [];
      this.modal.open();
      return;
    }
    // Trigger an event so that the current chat window adds the users
    this.chatService.addToChatSubject.next(
      this.contacts.filter(contact => contact.isSelected)
      .map(contact => contact.name)
    );
  }


  select(contact: Contact, event: MouseEvent) {
    // toggle selected and remove all selected if not ctrl.
    console.log(`clicked on user ${contact.name}`);
    const currentContactIsSelected = contact.isSelected;
    if (!event.ctrlKey) {
      // Clear all selections if the user is not pressing ctrl
      this.contacts.map( (c: Contact) => c.isSelected = false);
    }
    contact.isSelected = !currentContactIsSelected;

  }

  setModal(title: string, body: string) {
    this.modal.title = title;
    this.modal.body = body;
    // this.modal.buttons = [
    //   { message: 'Ok', onclick: () => this.router.navigate(['/main']) }
    // ];
    this.modal.open();
  }

  acknowledgeInviteResult(contact: Contact) {
    if (contact.isInviteAccepted) {
      this.modal.title = 'Invite accepted';
      this.modal.body = 'You can now chat with this user';
    }else { // contact.isInviteRejected
      this.modal.title = 'Invite rejected';
      this.modal.body = 'You won\'t be able to chat with this user';
    }
    this.modal.buttons = [
      {
        message: 'Ok', onclick: () => {
          this.socketService.acknowledgeInviteResult(contact.name);
          if (contact.isInviteAccepted) {
            contact.isInviteAccepted = undefined;
          }else {
            this.contacts.splice(this.contacts.indexOf(contact), 1);
          }
        }
      }
    ];
    this.modal.open();
  }

  initSocketObservers(): void {
    this.socketService.contactCameOnline.subscribe( ( contactName ) => {
      this.contacts.forEach(element => {
        if (element.name === contactName) {
          element.isOnline = true;
        }
      });
    });

    this.socketService.contactWentOffline.subscribe( ( contactName ) => {
      this.contacts.forEach(element => {
        if (element.name === contactName) {
          element.isOnline = false;
        }
      });
    });

    this.socketService.inviteAccepted.subscribe( ( contactName ) => {
      this.contacts.forEach(element => {
        if (element.name === contactName) {
          element.isInvitePending = false;
          element.isInviteAccepted = true;
          // element.isOnline // What to do? (trigger emit when sending ACK)
        }
      });
    });

    this.socketService.inviteRejected.subscribe( ( contactName ) => {
      this.contacts.forEach(element => {
        if (element.name === contactName) {
          element.isInvitePending = false;
          element.isInviteRejected = true;
          // element.isOnline // What to do? (trigger emit when sending ACK)
        }
      });
    });
  }
}

function setDummyData() {
  let contacts: Contact[];
  contacts = [
    {name: 'angie'},
    {name: 'contact1'},
    {name: 'contact2'},
    {name: 'contact3'},
    {name: 'contact4'},
    {name: 'contact5'},
    {name: 'contact6'},
    {name: 'contact7'},
    {name: 'contact8'},
    {name: 'contact9'},
    {name: 'contact10'}
  ];

  this.contacts = contacts;
}
