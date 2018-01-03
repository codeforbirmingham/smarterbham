/**
 *  Reports sensor readings from the device and updates the city_sensor
 * shadow on aws.
 */
import fs from 'fs';
import aws from 'aws-iot-device-sdk';
import _ from 'lodash';
import Logger from '../utilities/logger';
import awsConfig from '../../aws_config.json';

const rootDir = process.env.NODE_ENV === 'production' ? __dirname : `${__dirname}/..`;

class Sensor {
  constructor() {
    this.socket = null;
    this.shadow = aws.thingShadow({
      keyPath: `certs/${awsConfig.privateKey}`,
      certPath: `certs/${awsConfig.clientCert}`,
      caPath: `certs/${awsConfig.caCert}`,
      clientId: awsConfig.clientId,
      baseReconnectTimeMs: 4000,
      keepalive: 30,
      protocol: 'mqtts',
      port: awsConfig.port,
      host: awsConfig.host,
    });
  }

  get temperature() {
    // todo: actually read temperature values from sensor
    return Math.random() * 255;
  }

  get humidity() {
    // todo: actually read humidity values from sensor
    return Math.random() * 255;
  }

  get noise() {
    // todo: actually read noise values from microphone sensor
    return Math.random() * 100;
  }

  get lights() {
    // todo: actually read brightness values from sensor
    return Math.random() * 100;
  }

  get particleSize() {
    // todo: actually read particle size values from pollution sensor
    return Math.random() * 50;
  }

  initSocket(io) {
    this.socket = io;
  }

  register() {
    if (this.socket && fs.existsSync(`${rootDir}/ap.json`)) {
      this.shadow.register(awsConfig.thingName, { ignoreDeltas: true }, (err, failedTopics) => {
        if (_.isEmpty(err) && _.isEmpty(failedTopics)) {
          Logger.info(`registered ${awsConfig.thingName} with AWS`);
          this.isRegistered = true;
          this.onStatus();
          // report data every 10 seconds
          setInterval(() => this.onUpdate(), 10000);
        } else {
          Logger.error(err);
          Logger.error(failedTopics);
        }
      });
    }
  }

  onStatus() {
    this.shadow.on('status', (thingName, stat, clientToken, stateObject) => {
      // emit to web client
      this.socket.emit('status', stat);
      if (stat === 'rejected') {
        Logger.error(stateObject);
      }
    });
  }

  onUpdate() {
    const reported = {
      temperature: this.temperature,
      humidity: this.humidity,
      noise: this.noise,
      lights: this.lights,
      particle_size: this.particleSize,
    };
    this.shadow.update(awsConfig.thingName, { state: { reported } });
    // emit to web client
    this.socket.emit('update', reported);
  }
}

module.exports = new Sensor();
