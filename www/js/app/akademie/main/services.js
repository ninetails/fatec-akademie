var app = module.exports = require('angular').module('akademie.main.services', [require('../../appconfig').name])

.service('SyncService', require('./services/sync'))
.service('MeasureTypes', require('./services/measuretypes'))
.service('Measure', require('./services/measure'));
