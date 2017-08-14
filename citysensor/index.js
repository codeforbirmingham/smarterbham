/**
 *  Reports sensor readings from the device and updates the city_sensor
 * shadow on aws.
 */

const aws = require('aws-iot-device-sdk');
const cmdLineProcess = require('./lib/cmdline');
const isUndefined = require('./lib/is-undefined');
const sensor = require('./lib/sensor');

function main(args) {
  const shadow = aws.thingShadow({
      keyPath: args.privateKey,
      certPath: args.clientCert,
      caPath: args.caCert,
      clientId: args.clientId,
      region: args.region,
      baseReconnectTimeMs: args.baseReconnectTimeMs,
      keepalive: args.keepAlive,
      protocol: args.Protocol,
      port: args.port,
      host: args.host,
      debug: args.Debug
  });

  shadow.register(args.thingName, {ignoreDeltas: true}, function(err, failedTopics) {
    if (isUndefined(err) && isUndefined(failedTopics)) {
      console.log("registered shadow");
      setInterval(function() {
        console.log("reading sensor data");
        data = sensor.read();
        console.log("reporting new sensor data to aws iot");
        shadow.update(args.thingName, {state: {reported: data}});
      }, args.delay);
    } else {
      console.log("error attempting to register shadow");
      console.log("error = " + err);
      console.log("failed topics = " + failedTopics);
    }
  });

  shadow
    .on('connect', function() {
      console.log('connect');
    });
  shadow
    .on('close', function() {
      console.log('close');
    });
  shadow
    .on('reconnect', function() {
      console.log('reconnect');
    });
  shadow
    .on('offline', function() {
      console.log('offline');
    });
  shadow
    .on('error', function(error) {
      console.log('error', error);
    });
  shadow
    .on('message', function(topic, message) {
      console.log('message, topic: ' + topic + ', message: ' + message);
    });
  shadow
    .on('status', function(thingName, stat, clientToken, stateObject) {
      console.log('status: ' + stat);
    });
  shadow
    .on('timeout', function(thingName, clientToken) {
      console.log('timeout');
    });
}

module.exports = cmdLineProcess;

if (require.main === module) {
  cmdLineProcess('connect to the AWS IoT service and report city sensor data using MQTT',
      process.argv.slice(2), main);
}
