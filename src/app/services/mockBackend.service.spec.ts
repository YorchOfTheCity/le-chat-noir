import { TestBed, inject } from '@angular/core/testing';

import { MockBackendService } from './mockBackend.service';

describe('MockDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockBackendService]
    });
  });

  it('should be created', inject([MockBackendService], (service: MockBackendService) => {
    expect(service).toBeTruthy();
  }));
});
