import axios from 'axios';

const apiUrl= import.meta.env.VITE_SERVER_API_URL || 'http://localhost:5000/api/v1';


export type CycleInfoDTO = {
  userId: string;
  lastPeriodDate: string;
  cycleLength:string;
  periodDuration: string;
  flowIntensity: string;

};

interface CycleInfoResponse {
  message: string;
  data: {
    message: string;
    data: CycleInfoDTO;
  }; 

}

console.log("000",localStorage.getItem('token'));
export const saveCycleInfo = (data: CycleInfoDTO) => {
  return axios.post<CycleInfoResponse>(`${apiUrl}/cycle/cycle-info`, data,{
    headers: {
     authorization: ` ${localStorage.getItem('token') || ''}`,
    },  
  });
};