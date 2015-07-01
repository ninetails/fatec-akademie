var util = require('util');
var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.set('db', mongoose.connect('mongodb://localhost/akademie'));

// middlewares
app.use(cors({ origin: true }));
app.use(morgan());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static
app.use(express.static('www'));

// custom middleware
app.use((req, res, next) => {
  req.origin = 'web';
  if (!!req.headers && !!req.headers['x-request-source'] && req.headers['x-request-source'] === 'app') {
    req.origin = 'app';
  }
  next();
});

// modules
app.use('/', require('./modules/users'));
app.use('/akademie', require('./modules/akademie'));


// index
app.get('/', function (req, res) {
  res.sendFile('www/index.html');
});

// server
var server = app.listen(3000, function () {
  console.log(util.format('app listening at port %s', server.address().port));
});
