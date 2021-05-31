import { TestBed } from '@angular/core/testing';

import { LoggedInUserDataService } from './logged-in-user-data.service';

describe('LoggedInUserDataService', () => {
  let service: LoggedInUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
