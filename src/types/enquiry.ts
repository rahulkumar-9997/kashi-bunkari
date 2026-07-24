export type ContactFormEnquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  website?: string;
};

export type ContactFormEnquiryResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
