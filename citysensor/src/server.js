/* eslint-disable no-unused-vars */
const nextJs = require('next');
const path = require('path');
const fs = require('fs');
const Server = require('http').Server;
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const networkApi = require('./api/networks');
const Logger = require('./utilities/logger');
const Sensor = require('./api/sensor');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = nextJs({
  dir: './src',
  dev,
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
    if (fs.existsSync(`${__dirname}/ap.json`)) {
      handle(req, res);
    } else {
      res.redirect('/register');
    }
  });

  app.get('/register', (req, res) => {
    if (fs.existsSync(`${__dirname}/ap.json`)) {
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
    if (!process.env.HOST) console.log('\x1b[31m', 'Missing required environment variable: HOST=', '\x1b[0m');
    console.log(`> Ready on http://${process.env.HOST}:3000`);
  });
}).catch(err => Logger.error(`Failed to start server: ${err}`));
