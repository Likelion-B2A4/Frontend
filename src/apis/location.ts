import instance from '../utils/axiosInstance';

interface LocationPermissionResponse {
  isSuccess: boolean;
  message: string;
  data: {
    locationPermission: boolean;
  };
}

export const getLocationPermissionApi = async () => {
  const response = await instance.get<LocationPermissionResponse>('/api/patients/locations');
  return response.data;
};
