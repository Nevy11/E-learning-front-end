export interface ReturnedHashValue {
  hashed_value: string;
}
export interface ReturnedOtp {
  email_address: string;
  is_success: boolean;
  hashed_otp: string;
  message: string;
}
export interface verifyOtp {
  matches: boolean;
  is_success: boolean;
  message: String;
}
export interface ReturnedSignUp {
  username: string;
  useremail: string;
  is_successful: boolean;
  message: string;
}
