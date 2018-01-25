import axios from 'axios';

const deviceApi = axios.create({
  baseURL: `http://${process.env.HOST}:3000/api/v1`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default deviceApi;
