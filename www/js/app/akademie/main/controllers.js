var $ = require('jquery');
var moment = require('moment');
var app = module.exports = require('angular').module('akademie.main.controllers', [])

// dashboard
.controller('DashController', require('./controllers/dash'))

// measure
.controller('MeasureController', require('./controllers/measure'))
.controller('MeasureEditController', require('./controllers/measureedit'))

// settings
.controller('SettingsController', require('./controllers/settings'))

// training
.controller('TrainingCreateController', require('./controllers/trainingcreate'));
