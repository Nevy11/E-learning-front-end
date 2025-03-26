import { TestBed } from '@angular/core/testing';

import { EmailOtpVerifyService } from './email-otp-verify.service';

describe('EmailOtpVerifyService', () => {
  let service: EmailOtpVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailOtpVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
