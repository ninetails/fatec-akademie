var app = module.exports = require('angular').module('akademie.main.services', ['ngStorage', require('../../appconfig').name])

.service('SyncService', require('./services/sync'))
.service('MeasureTypes', require('./services/measuretypes'))
.service('Measure', require('./services/measure'))
.service('Training', require('./services/training'));
