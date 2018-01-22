const _ = require('lodash');

const byteLength = (str) => {
  // returns the byte length of a utf8 string
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s += 1;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
  }
  return s;
};

module.exports = {
  airport: (stdout) => {
    const lines = stdout.split('\n');
    const colMac = lines[0].indexOf('BSSID');
    const colRssi = lines[0].indexOf('RSSI');
    const colChannel = lines[0].indexOf('CHANNEL');
    const colHt = lines[0].indexOf('HT');
    const colSec = lines[0].indexOf('SECURITY');

    const wifis = [];
    for (let i = 1, l = lines.length; i < l; i++) {
      const byteOffset = lines[i].length - byteLength(lines[i]);
      wifis.push({
        mac: lines[i].substr(colMac + byteOffset, colRssi - colMac).trim(),
        ssid: lines[i].substr(0, colMac + byteOffset).trim(),
        channel: lines[i].substr(colChannel + byteOffset, colHt - colChannel).trim(),
        signal_level: lines[i].substr(colRssi + byteOffset, colChannel - colRssi).trim(),
        security: lines[i].substr(colSec + byteOffset).trim() !== 'NONE',
      });
    }
    // remove any empty networks
    return _.reject(wifis, { ssid: '' });
  },

  iwlist: (stdout) => {
    // splitting the stdout creates an array where the first item is just whitespace. get rid of it.
    const lines = _.drop(stdout.split('Cell'));
    const macLine = 'Address:';
    const securityLine = 'Encryption key:';
    const ssidLine = 'ESSID:';

    const wifis = [];
    lines.forEach((l) => {
      const macIdx = l.indexOf(macLine) + 1; // get rid of extra white space
      const securityIdx = l.indexOf(securityLine);
      const ssidIdx = l.indexOf(ssidLine);
      wifis.push({
        mac: l.substr(macIdx + macLine.length, 17).trim(),
        ssid: l.substr(ssidIdx + ssidLine.length).trim().replace(/['"]+/g, ''),
        security: l.substr(securityIdx + securityLine.length, 3).trim() === 'on',
      });
    });
    // remove any empty networks
    return _.reject(wifis, { ssid: '' });
  },
};
