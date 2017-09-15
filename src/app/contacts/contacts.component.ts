import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../services/session.service';
import { BackendService } from '../services/backend.service';

interface Contact {
  name: string;
  email: string;
  selected?: boolean;
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

  openChat() {
    // TODO: Open a chat window for group chat with all the users selected.
  }

  addToChat() {
    // TODO: Add selected users to chat
  }


  select(contact: Contact, event: MouseEvent) {
    // TODO: check if ctrl click to select multiple users... toggle selected on the element if ctrl
    // toggle selected and remove all selected if not ctrl.
    console.log(`clicked on user ${contact.name}`);
    if (!event.ctrlKey) {
      // Clear all selections if the user is not pressing ctrl
      this.contacts.map( (c: Contact) => c.selected = false);
    }
    contact.selected = !contact.selected;

  }

}

function setDummyData() {
  let contacts: Contact[];
  contacts = [
    {name: 'angie', email: 'elangie@tekmexico.com'},
    {name: 'contact1', email: 'contact1@tekmexico.com'},
    {name: 'contact2', email: 'contact2@tekmexico.com'},
    {name: 'contact3', email: 'contact3@tekmexico.com'},
    {name: 'contact4', email: 'contact4@tekmexico.com'},
    {name: 'contact5', email: 'contact5@tekmexico.com'},
    {name: 'contact6', email: 'contact6@tekmexico.com'},
    {name: 'contact7', email: 'contact7@tekmexico.com'},
    {name: 'contact8', email: 'contact8@tekmexico.com'},
    {name: 'contact9', email: 'contact9@tekmexico.com'},
    {name: 'contact10', email: 'contact10@tekmexico.com'},
  ];

  this.contacts = contacts;
}
