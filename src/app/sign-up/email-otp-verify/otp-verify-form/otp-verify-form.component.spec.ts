import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerifyFormComponent } from './otp-verify-form.component';

describe('OtpVerifyFormComponent', () => {
  let component: OtpVerifyFormComponent;
  let fixture: ComponentFixture<OtpVerifyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpVerifyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpVerifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
