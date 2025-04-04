export interface Login {
  email_address: string;
  password: string;
}
export interface ReturnLogin {
  is_correct: boolean;
  is_success: boolean;
  message: String;
}
