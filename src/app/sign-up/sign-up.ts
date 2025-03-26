export interface SignUp {}
export interface ReturnedHashValue {
  hashed_value: string;
}
export interface ReturnedOtp {
  email_address: string;
  is_success: boolean;
  hashed_otp: string;
  message: string;
}
