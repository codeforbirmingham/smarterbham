import axios from 'axios';

const nodeUrl = 'http://localhost:8000';
const deviceApi = axios.create({
  baseURL: nodeUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default deviceApi;
