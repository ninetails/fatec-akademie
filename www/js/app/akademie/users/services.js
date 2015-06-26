var $ = require('jquery');

var app = module.exports = require('angular').module('akademie.users.services', [])

.service('LoginService', require('./services/login'));