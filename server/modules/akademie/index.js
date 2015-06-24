var express = require('express');
var app = express();

app.post('/sync', (req, res) => {
  console.log(req.body);
  console.log(JSON.parse(req.body));
  res.jsonp({
    error: null
  });

  return res.end();
});

module.exports = app;
