import instance from '../utils/axiosInstance';
import { useAuthStore } from '../hooks/useAuthStore';

interface LoginPatientPayload {
  loginId: string;
  pwd: string;
}

interface LoginPatientResponse {
  isSuccess: boolean;
  message: string;
  patientId: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export const loginPatientApi = async (payload: LoginPatientPayload) => {
  const response = await instance.post<LoginPatientResponse>('/api/patients/login', payload);
  return response.data;
};

export const logoutPatientApi = async () => {
  await instance.post('/api/patients/login');
  useAuthStore.getState().clearAuth();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
