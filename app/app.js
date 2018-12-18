const onigiri = require('../onigiri');
const gyoza = require('../gyoza/lib');

console.log(gyoza);

require('dotenv').config();

const dev = process.env.ENV === 'dev';

const tplDir = './views';

const tplConf = {
  basedir:tplDir
};

const srvConf = {
  port: process.env.NODE_PORT,
  host: process.env.NODE_HOST,
  debug: dev ? { trace: true, logs: 'debug' } : {},
  template: gyoza(tplConf)
};

onigiri.Server(srvConf);