// src/services/apiAuthServices.ts
import axios from 'axios';
import { ApiAuthentication, PaginatedResponse, ApiResponse } from '@/types/api';

const API_BASE_URL = '/api/auth';

export const fetchApiAuthentications = async (params?: {
  search?: string;
  status?: 'Active' | 'Inactive';
  startsWith?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<ApiAuthentication>> => {
  const response = await axios.get<ApiResponse<PaginatedResponse<ApiAuthentication>>>(API_BASE_URL, { params });
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to fetch API authentications');
  }
  return response.data.data;
};

export const fetchApiAuthentication = async (id: number): Promise<ApiAuthentication> => {
  const response = await axios.get<ApiResponse<ApiAuthentication>>(`${API_BASE_URL}/${id}`);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to fetch API authentication');
  }
  return response.data.data;
};

export const createApiAuthentication = async (data: {
  username: string;
  auth_method: 'IP-Based' | 'None';
}): Promise<ApiAuthentication> => {
  const response = await axios.post<ApiResponse<ApiAuthentication>>(API_BASE_URL, data);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to create API authentication');
  }
  return response.data.data;
};

export const updateApiAuthentication = async (
  id: number,
  data: {
    username?: string;
    auth_method?: 'IP-Based' | 'None';
    status?: 'Active' | 'Inactive';
  }
): Promise<ApiAuthentication> => {
  const response = await axios.put<ApiResponse<ApiAuthentication>>(`${API_BASE_URL}/${id}`, data);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to update API authentication');
  }
  return response.data.data;
};

export const deleteApiAuthentication = async (id: number): Promise<void> => {
  const response = await axios.delete<ApiResponse>(`${API_BASE_URL}/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to delete API authentication');
  }
};
