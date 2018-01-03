/* eslint-disable no-unused-vars */
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import bodyParser from 'body-parser';
import deviceRoutes from './routes/device';
import Logger from './utilities/logger';

const app = new Express();
const server = new Server(app);
const port = process.env.PORT || 8000;
// configurable path directory
const dirPath = process.env.NODE_ENV === 'production' ? __dirname : `${__dirname}/../dist`;

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
* Device API Routes
*/
app.use('/', deviceRoutes);

// Error handling middleware, must be defined after all app.use() calls
app.use((err, req, res, next) => {
  Logger.error(err);
  res.status(err.status || 500).end();
});

// serve up index file so react can do its thing (must be after api routes)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(dirPath, 'index.html'));
});

server.listen(port, (err) => {
  if (err) {
    Logger.error(err);
  }
});
