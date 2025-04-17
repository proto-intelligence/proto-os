export interface WebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      verification: {
        status: string;
      };
    }>;
    first_name: string;
    last_name: string;
    created_at: number;
    updated_at: number;
    // Add other fields as needed based on Clerk's webhook documentation
  };
  object: string;
} 