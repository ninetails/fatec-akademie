var express = require('express');
var app = express();

app.post('/login', require('./login'));
app.post('/signup', require('./signup'));

module.exports = app;
