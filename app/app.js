const onigiri = require('../onigiri');
const gyoza = require('../gyoza/lib');

require('dotenv').config();

const dev = process.env.ENV === 'dev';

const templateConf = {
  basedir: 'views',
  cache: false,
};

const strategy = {
  check: (res, req) => {
    console.log(res);
  },
}

const appConf = {
  port: process.env.NODE_PORT,
  host: process.env.NODE_HOST,
  strategy: strategy,
  debug: dev ? { trace: true, logs: 'debug' } : {},
  template: gyoza(templateConf)
};

onigiri.Server(appConf);
