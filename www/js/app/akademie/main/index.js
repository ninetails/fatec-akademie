var app = module.exports = require('angular').module('akademie.main', [
  'ionic',
  'ngCordova',
  'ngStorage',
  // require('./services').name,
  require('./controllers').name
])

.config(require('./config'))

.value('measure_types', [
  {
    name: 'height',
    text: 'Altura',
    unit: 'm'
  },
  {
    name: 'weight',
    text: 'Peso',
    unit: 'kg'
  }
]);
