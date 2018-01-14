/* eslint-disable no-unused-vars */
import next from 'next';
import path from 'path';
import fs from 'fs';
import { Server } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import deviceApi from './api/device';
import Logger from './utilities/logger';
import Sensor from './api/sensor';

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dir: './src',
  dev,
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = new Server(expressApp);
  const io = require('socket.io')(server);

  expressApp.use(bodyParser.json());

  /**
  * Device APIs
  */
  expressApp.use('/api/v1', deviceApi);
  Sensor.initSocket(io);
  Sensor.register();

  // Error handling middleware, must be defined after all expressApp.use() calls
  expressApp.use((err, req, res, next) => {
    Logger.error('--Caught Middleware Exception--');
    Logger.error(err);
    res.status(err.status || 500).end();
  });

  /**
  * Pages
  */
  expressApp.get('/', (req, res) => {
    let page = '/register';
    if (fs.existsSync(`${__dirname}/ap.json`)) {
      page = '/';
    }
    app.render(req, res, page);
  });

  expressApp.get('*', (req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) {
      Logger.error(err);
      throw err;
    }
    console.log('> Ready on http://localhost:3000');
  });
});
