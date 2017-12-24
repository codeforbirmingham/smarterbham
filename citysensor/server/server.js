/* eslint-disable react/jsx-filename-extension */
import path from 'path';
import { Server } from 'http';
import Express from 'express';

const app = new Express();
const server = new Server(app);
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
// configurable path directory
const dirPath = env === 'production' ? __dirname : `${__dirname}/../dist`;

// define the folder that will be used for static assets
app.use(Express.static(path.resolve(dirPath)));

// Error handling middleware, must be defined after all app.use() calls
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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
