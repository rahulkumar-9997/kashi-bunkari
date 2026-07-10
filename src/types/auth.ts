export interface Customer {
  id: number;
  name: string;
  email: string;
  customer_id: string;
  google_id: string | null;
  profile_img: string | null;
  phone_number: string | null;
  status: boolean;
  date_of_birth: string | null;
  gender: string | null;
  bio: string | null;
  login_attempts: number;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    customer: Customer;
    access_token: string;
    token_type: string;
    is_profile_complete: boolean;
    expires_in: number;
  };
}
