// src/types/api.ts
export interface ApiAuthentication {
  id: number;
  username: string;
  token_value: string;
  auth_method: 'IP-Based' | 'None';
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}