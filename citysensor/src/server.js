/* eslint-disable no-unused-vars */
const nextJs = require('next');
const fs = require('fs');
const Server = require('http').Server;
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const networkApi = require('./api/networks');
const Logger = require('./utilities/logger');
const Sensor = require('./api/sensor');

const wpaSupplicant = './wpa_supplicant.conf';
const dev = process.env.NODE_ENV !== 'production';
const dir = dev ? 'src' : '.';
const nextApp = nextJs({
  dev,
  dir,
});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = new Server(app);
  const io = socket(server);

  // API Setup
  app.use(bodyParser.json());
  app.use('/api/v1/networks', networkApi);
  Sensor.init(io);

  // Error handling middleware, must be defined after all app.use() calls
  app.use((err, req, res, next) => {
    Logger.error(`--Caught Middleware Exception--\n ${err}`);
    res.status(err.status || 500).end();
  });

  /**
  * Pages
  */
  // handle server-side redirects based on registered condition
  app.get('/', (req, res) => {
    if (fs.existsSync(wpaSupplicant)) {
      handle(req, res);
    } else {
      res.redirect('/register');
    }
  });

  app.get('/register', (req, res) => {
    if (fs.existsSync(wpaSupplicant)) {
      res.redirect('/');
    } else {
      handle(req, res);
    }
  });

  // TODO: use custom 404 page
  app.get('*', (req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) {
      Logger.error(err);
      throw err;
    }
    console.log(`> Ready on http://${process.env.HOST}:3000`);
  });
}).catch(err => Logger.error(`Failed to start server: ${err}`));
