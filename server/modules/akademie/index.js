var express = require('express');
var app = express();

app.post('/sync', require('./sync'));

module.exports = app;
