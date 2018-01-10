/* eslint-disable no-unused-vars */
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import bodyParser from 'body-parser';
import deviceApi from './api/device';
import Logger from './utilities/logger';
import Sensor from './api/sensor';

const app = new Express();
const server = new Server(app);
const io = require('socket.io')(server);

const port = 8000;
const staticPath = process.env.NODE_ENV === 'production' ? __dirname : `${__dirname}/../dist`;

// define the folder that will be used for static assets
app.use(Express.static(path.resolve(staticPath)));
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
* Device APIs
*/
app.use('/', deviceApi);
Sensor.initSocket(io);
Sensor.register();

// Error handling middleware, must be defined after all app.use() calls
app.use((err, req, res, next) => {
  Logger.error('--Caught Middleware Exception--');
  Logger.error(err);
  res.status(err.status || 500).end();
});

// serve up index file so react can do its thing (must be after api routes)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(staticPath, 'index.html'));
});

server.listen(port, (err) => {
  if (err) {
    Logger.error(err);
  }
});
