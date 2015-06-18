var util = require('util');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.use(morgan());
app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./users'));

app.get('/', function (req, res) {
  res.sendFile('www/index.html');
});

var server = app.listen(3000, function () {
  console.log(util.format('app listening at http://%s:%s', server.address().address, server.address().port));
});
