import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOtpVerifyComponent } from './email-otp-verify.component';

describe('EmailOtpVerifyComponent', () => {
  let component: EmailOtpVerifyComponent;
  let fixture: ComponentFixture<EmailOtpVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailOtpVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
