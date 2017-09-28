import { TestBed, inject } from '@angular/core/testing';

import { ChatsManagementService } from './chats-management.service';

describe('ChatsManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatsManagementService]
    });
  });

  it('should be created', inject([ChatsManagementService], (service: ChatsManagementService) => {
    expect(service).toBeTruthy();
  }));
});
