import { TestBed } from '@angular/core/testing';

import { IdAdminService } from './id-admin.service';

describe('IdAdminService', () => {
  let service: IdAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
