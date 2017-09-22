import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SessionService } from '../services/session.service';
import { BackendService } from '../services/backend.service';
import { ModalComponent } from '../bootstrap/modal/modal.component';
import * as io from 'socket.io-client';
import { BACKEND_URL_SOCKETS } from '../tokens';
import { SocketService } from '../services/socket.service';

interface Contact {
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

  @ViewChild('modal')
  modal: ModalComponent;

  constructor(private db: BackendService, private session: SessionService, private socketService: SocketService) {
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
      console.log('debug line');
      invites.forEach(invite => {
        const contact: Contact = { name: invite.contact };
        if (invite.accept === undefined) {
          contact.isInvitePending = true;
        }else if (invite.accept) {
          contact.isInviteAccepted = true;
        }else {
          contact.isInviteRejected = true;
        }
        this.contacts.push( contact );
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
    // TODO: Open a chat window for group chat with all the users selected.
  }

  addToChat() {
    // TODO: Add selected users to chat
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
          // element.isOnline // What to do?
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
