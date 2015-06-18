var util = require('util');
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

// middlewares
app.use(cors());
app.use(morgan());
app.use(bodyParser.urlencoded({ extended: true }));

// static
app.use(express.static('www'));

// custom middleware
app.use((req, res, next) => {
  if ( !!req.headers && !!req.headers['x-request-source'] ) {
    req.origin = req.headers['x-request-source'] === 'app' ? 'app' : 'web' ;
  }
  next();
});

// modules
app.use('/', require('./modules/users'));


// index
app.get('/', function (req, res) {
  res.sendFile('www/index.html');
});

// server
var server = app.listen(3000, function () {
  console.log(util.format('app listening at port %s', server.address().port));
});
