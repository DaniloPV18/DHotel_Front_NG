import { TestBed } from '@angular/core/testing';

import { GuestComponentsService } from './guest-create-component.service';

describe('GuestComponentsService', () => {
  let service: GuestComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
