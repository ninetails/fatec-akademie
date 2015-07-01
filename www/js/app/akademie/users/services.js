var app = module.exports = require('angular').module('akademie.users.services', ['ngStorage', require('../../appconfig').name])

.service('LoginService', require('./services/login'));