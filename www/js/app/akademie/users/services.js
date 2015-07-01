var app = module.exports = require('angular').module('akademie.users.services', [require('../../appconfig').name])

.service('LoginService', require('./services/login'));