var express = require('express');
var app = express();

app.post('/sync', (req, res) => {
  console.log(req.body.measures.length);
  res.jsonp({
    error: null,
    body: req.body
  });

  return res.end();
});

module.exports = app;
