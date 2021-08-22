import { TestBed } from '@angular/core/testing';

import { BugServiceService } from './bug-service.service';

describe('BugServiceService', () => {
  let service: BugServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
