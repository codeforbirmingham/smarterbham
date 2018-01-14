/* eslint-disable no-unused-vars */
import nextJs from 'next';
import path from 'path';
import fs from 'fs';
import { Server } from 'http';
import express from 'express';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import deviceApi from './api/device';
import Logger from './utilities/logger';
import Sensor from './api/sensor';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = nextJs({
  dir: './src',
  dev,
});
const handle = nextApp.getRequestHandler();

nextApp.prepare()
  .then(() => {
    const app = express();
    const server = new Server(app);
    const io = socket(server);

    // API Setup
    app.use(bodyParser.json());
    app.use('/api/v1', deviceApi);
    Sensor.initSocket(io);
    Sensor.register();

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

    app.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) {
        Logger.error(err);
        throw err;
      }
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(err => Logger.error(`Failed to start server: ${err}`));
