import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { User } from '../services/backend.service';
import { ChatsManagementService } from '../services/chats-management.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ChatsManagementService]
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(private session: SessionService) {
    this.user = session.user;
  }

  ngOnInit() {
    this.user = this.session.user;
  }

}
