export type BulkOrderEnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  website?: string;
};

export type BulkOrderEnquiryResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
