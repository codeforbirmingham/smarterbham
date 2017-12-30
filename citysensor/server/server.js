/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import bodyParser from 'body-parser';
import WiFiControl from 'wifi-control';

const app = new Express();
const server = new Server(app);
const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV;
// configurable path directory
const dirPath = env === 'production' ? __dirname : `${__dirname}/../dist`;

// https://www.npmjs.com/package/wifi-control
WiFiControl.init({
  debug: env !== 'production',
});

// define the folder that will be used for static assets
app.use(Express.static(path.resolve(dirPath)));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

/**
* Internal API Routes
*/
app.get('/networks', (req, res) => {
  WiFiControl.scanForWiFi((err, wifiRes) => {
    if (err) {
      return res.status(500).send(err);
    }
    const wifiNetworks = wifiRes.networks.map(network => network);
    return res.send(wifiNetworks);
  });
});

app.post('/networks', (req, res) => {
  const ap = {
    ssid: req.body.ssid,
    password: req.body.password,
  };
  WiFiControl.connectToAP(ap, (err, wifiRes) => {
    if (err) {
      return res.status(500).send(err);
    }
    // create json file for storing network info
    fs.writeFileSync(`${dirPath}/ap.json`, JSON.stringify(ap));
    return res.status(200).send(wifiRes);
  });
});

// Error handling middleware, must be defined after all app.use() calls
app.use((err, req, res, next) => {
  console.log(`Error Middleware: ${err.message}`);
  res.status(err.status || 500).end();
});

// serve up index file so react can do its thing (must be after api routes)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(dirPath, 'index.html'));
});

server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `Server running on http://localhost:${port} [${env}]`);
});
