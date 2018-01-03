import Express from 'express';
import fs from 'fs';
import WiFiControl from 'wifi-control';
import Logger from '../utilities/logger';
import Sensor from '../api/sensor';

const rootDir = process.env.NODE_ENV === 'production' ? __dirname : `${__dirname}/..`;
const router = Express.Router();

// https://www.npmjs.com/package/wifi-control
WiFiControl.init({
  debug: process.env.NODE_ENV !== 'production',
});

router.get('/currentConfig', (req, res) => {
  fs.readFile(`${rootDir}/ap.json`, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      res.status(404).send('Config not found');
    } else {
      res.send(data);
    }
  });
});

router.get('/networks', (req, res) => {
  WiFiControl.scanForWiFi((err, wifiRes) => {
    if (err) {
      Logger.error(err);
      return res.status(500).send(err);
    }
    const wifiNetworks = wifiRes.networks.map(network => network);
    return res.send(wifiNetworks);
  });
});

router.post('/networks', (req, res) => {
  const ap = {
    ssid: req.body.ssid,
    password: req.body.password,
  };

  WiFiControl.connectToAP(ap, (err, wifiRes) => {
    if (err) {
      Logger.error(err);
      return res.status(500).send(err);
    }
    // create json file for storing network info
    Logger.info(`Saved access point: ${req.body.ssid}`);
    fs.writeFileSync(`${rootDir}/ap.json`, JSON.stringify(ap));
    // register sensor!
    Sensor.register();
    return res.status(200).send(wifiRes);
  });
});

module.exports = router;
