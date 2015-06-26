var $ = require('jquery');
var app = module.exports = require('angular').module('akademie.main.services', [])

.service('SyncService', require('./services/sync'))
.service('MeasureTypes', require('./services/measuretypes'))
.service('Measure', require('./services/measure'));
