// when pkg-ing the app we set NODE_ENV as production and require src/server.js
process.env.NODE_ENV = 'production';
require('../src/server.js');
