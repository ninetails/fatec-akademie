var app = module.exports = require('angular').module('akademie.users', [
  'ionic',
  'ngCordova',
  'ngStorage',
  require('./services').name,
  require('./controllers').name
])

.config(require('./config'));
