import axios from 'axios';

const apiUrl= process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
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
  return axios.post(`${apiUrl}/auth/register`, data);
};
