const exec = require('child_process').exec;
const parseStdout = require('./parseStdout');

const macProvider = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport';

class WifiControl {
  constructor() {
    this.debug = false;
    this.platform = process.platform;
  }

  init(settings) {
    if (settings) {
      this.debug = settings.debug;
    }
  }

  scan() {
    this.logger(`Scanning networks on ${this.platform} OS...`);
    return new Promise((resolve, reject) => {
      switch (this.platform) {
        case 'linux':
          exec('sudo iwlist wlan0 scan | grep -E \'Address|Channel|Encryption|ESSID\'', (err, stdout) => {
            if (err) {
              reject(err);
            } else {
              resolve(parseStdout.iwlist(stdout));
            }
          });
          break;
        case 'darwin':
          exec(`${macProvider} -s`, (err, stdout) => {
            if (err) {
              reject(err);
            } else {
              resolve(parseStdout.airport(stdout));
            }
          });
          break;
        default: {
          const errMsg = `Scan failed on unsupported operating system: ${this.platform}`;
          this.logger(errMsg);
          reject(errMsg);
        }
      }
    });
  }

  connect(accessPoint) {
    const ssid = accessPoint.ssid;
    const pass = accessPoint.password;
    this.logger(`Connecting to network: ${ssid}`);

    return new Promise((resolve, reject) => {
      switch (this.platform) {
        case 'linux':
          exec(`
            sudo wpa_cli set_network 0 ssid "${ssid}"
            && sudo wpa_cli set_network 0 psk "${pass}"
            && sudo wpa_cli enable_network 0
          `, (err, stdout) => {
            if (err || stdout.includes('Error')) {
              this.logger(stdout);
              reject(stdout);
            } else {
              this.logger('Connected!', stdout);
              resolve(true);
            }
          });
          break;
        case 'darwin':
          // eslint-disable-next-line
          exec('networksetup -listallhardwareports | awk \'/^Hardware Port: (Wi-Fi|AirPort)$/{getline;print $2}\'', (listErr, port) => {
            if (listErr) return reject(listErr);
            const iface = port.trim();
            exec(`networksetup -setairportnetwork ${iface} ${ssid} ${pass}`, (connectErr, stdout) => {
              if (connectErr || stdout.includes('Error')) {
                this.logger(stdout);
                reject(stdout);
              } else {
                this.logger('Connected!', stdout);
                resolve(true);
              }
            });
          });
          break;
        default: {
          const errMsg = `Failed to connect on unsupported system: ${this.platform}`;
          this.logger(errMsg);
          reject(errMsg);
        }
      }
    });
  }

  logger(msg) {
    if (this.debug) {
      console.log(msg);
    }
  }
}

module.exports = new WifiControl();
