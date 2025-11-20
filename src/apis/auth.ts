import instance from '../utils/axiosInstance';
import { useAuthStore } from '../hooks/useAuthStore';

interface LoginPayload {
  loginId: string;
  pwd: string;
}

interface LoginResponse {
  isSuccess: boolean;
  message: string;
  patientId: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  imageUrl?: string;
}

export const loginPatientApi = async (payload: LoginPayload) => {
  const response = await instance.post<LoginResponse>('/api/patients/login', payload);
  return response.data;
};

export const logoutPatientApi = async () => {
  await instance.post('/api/patients/login');
  useAuthStore.getState().clearAuth();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const loginHospitalApi = async (payload: LoginPayload) => {
  const response = await instance.post<LoginResponse>('/api/hospitals/login', payload);
  return response.data;
};

export const logoutHospitalApi = async () => {
  await instance.post('/api/hospitals/login');
  useAuthStore.getState().clearAuth();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
