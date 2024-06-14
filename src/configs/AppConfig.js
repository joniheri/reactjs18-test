import axios from 'axios';

export const ApiBaseURL1 = axios.create({
  baseURL: 'http://localhost:3001/api',
});
