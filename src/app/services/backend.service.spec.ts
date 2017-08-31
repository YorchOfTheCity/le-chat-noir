import { TestBed, inject } from '@angular/core/testing';

import { BackendService } from './backend.service';

describe('DbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService]
    });
  });

  it('should be created', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
