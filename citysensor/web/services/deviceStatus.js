import deviceApi from './deviceApi';

export default {
  getConfig: () =>
    deviceApi.get('/currentConfig').then(res => res.data).catch(err => err),
  isRegistered: () =>
    deviceApi.get('/currentConfig').then(() => true).catch(() => false),
};
