const onigiri = require('../onigiri');

require('dotenv').config();

const dev = process.env.ENV === 'dev';

onigiri.Server({
  port: process.env.NODE_PORT,
  host: process.env.NODE_HOST,
  debug: dev ? { trace: true, logs: 'debug' } : {}
});