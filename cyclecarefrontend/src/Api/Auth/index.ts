import axios from 'axios';

const apiUrl= import.meta.env.VITE_SERVER_API_URL || 'http://localhost:5000/api/v1';
console.log("API URL:", apiUrl);

export type SignupCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
    address: string;
    dob: Date;
    confirmPassword: string;
};

export const SignupUser = (data: SignupCredentialsDTO) => {
  return axios.post(`${apiUrl}/auth/register-user`, data);
};

interface LoginResponse {
  token: string;
  data: {
   isprofileComplete: boolean;
  };
}

export const loginUser = (data: { email: string; password: string }) => {
  return axios.post<LoginResponse>(`${apiUrl}/auth/login-user`, data);
};