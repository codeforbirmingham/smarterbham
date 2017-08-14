'use strict';

class Sensor {
  constructor() {
  }

  get temperature() {
    // todo: actually read temperature values from sensor
    return Math.random()*255;
  }

  get humidity() {
    // todo: actually read humidity values from sensor
    return Math.random()*255;
  }

  get noise() {
    // todo: actually read noise values from microphone sensor
    return Math.random()*100;
  }

  get lights() {
    // todo: actually read brightness values from sensor
    return Math.random()*100;
  }

  get particle_size() {
    // todo: actually read particle size values from pollution sensor
    return Math.random()*50;
  }

  read() {
    return {
      temperature: this.temperature,
      humidity: this.humidity,
      noise: this.noise,
      lights: this.lights,
      particle_size: this.particle_size
    }
  }
}

module.exports = new Sensor();
