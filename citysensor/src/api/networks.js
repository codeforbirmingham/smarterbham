const express = require('express');
const fs = require('fs');
const WiFiControl = require('../utilities/wifi-control');
const Logger = require('../utilities/logger');
const Sensor = require('./sensor');

const rootDir = `${__dirname}/..`;
const router = express.Router();

WiFiControl.init({
  debug: process.env.NODE_ENV !== 'production',
});

router.get('/config', (req, res) => {
  fs.readFile(`${rootDir}/ap.json`, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      res.status(404).send('Config not found');
    } else {
      res.send(data);
    }
  });
});

router.get('/', (req, res) => {
  WiFiControl.scan()
    .then((networks) => {
      res.send(networks);
    })
    .catch((err) => {
      Logger.error(err);
      res.status(500).send(err);
    });
});

router.post('/', (req, res) => {
  const ap = {
    ssid: req.body.ssid,
    password: req.body.password,
  };

  WiFiControl.connect(ap)
    .then((success) => {
      // create json file for storing network info
      Logger.info(`Saved access point: ${req.body.ssid}`);
      fs.writeFileSync(`${rootDir}/ap.json`, JSON.stringify(ap));
      // register sensor!
      Sensor.register();
      return res.status(200).send(success);
    })
    .catch((err) => {
      Logger.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
