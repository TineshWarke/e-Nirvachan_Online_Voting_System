import axios from 'axios';

export const BASE_URL = 'http://localhost:8081/';
export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
      }
});