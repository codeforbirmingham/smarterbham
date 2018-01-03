import axios from 'axios';

const deviceApi = axios.create({
  baseURL: process.env.NODE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default deviceApi;
