var express = require('express');
var app = express();

app.post('/login', (req, res) => {
  res.jsonp({
    status: 'received!',
    user: req.body.user,
    pass: req.body.pass
  });
});

module.exports = app;