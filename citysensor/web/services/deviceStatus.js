import deviceApi from './deviceApi';

export default {
  isConnected: () => deviceApi.get('/isConnected').then(res => res.data),
};
