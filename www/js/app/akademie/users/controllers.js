var app = module.exports = require('angular').module('akademie.users.controllers', [])

.controller('LogoutController', require('./controllers/logout'))
.controller('LoginController', require('./controllers/login'))
.controller('SignupController', require('./controllers/signup'));
