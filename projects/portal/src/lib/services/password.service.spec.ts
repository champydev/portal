import { TestBed, inject } from '@angular/core/testing';

import { PasswordService } from './password.service';

describe('PortalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordService]
    });
  });

  it('should be created', inject([PasswordService], (service: PasswordService) => {
    expect(service).toBeTruthy();
  }));
});
