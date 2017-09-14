import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../services/session.service';
import { BackendService } from '../services/backend.service';

interface Contact {
  name: string;
  email: string;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  // TODO: Listen for users that connect, add icon for online/offline status, move online users to the top
  contacts: Contact[];

  constructor(private db: BackendService, private session: SessionService) {
    setDummyData.call(this);
  }

  ngOnInit() {
    // TODO: Fill contacts, maybe keep track of open chats and download their history
    // (1 day maybe?, option to scroll up and dl another day?)
  }

  addContact(contact: string) {
    // TODO: Implement this
    console.log(`contact input is ${contact}`);
  }

  openChat(contact: Contact) {
    // TODO: Implement this... check if the chat is already open and just focus it.
    console.log(`Open chat for user ${contact.name}`);
  }
}

function setDummyData() {
  this.contacts = [
    {name: 'angie', email: 'elangie@tekmexico.com'},
    {name: 'contact1', email: 'contact1@tekmexico.com'},
    {name: 'contact2', email: 'contact2@tekmexico.com'},
    {name: 'contact3', email: 'contact3@tekmexico.com'},
    {name: 'contact4', email: 'contact4@tekmexico.com'},
    {name: 'contact5', email: 'contact5@tekmexico.com'},
    {name: 'contact6', email: 'contact6@tekmexico.com'},
  ];
}
