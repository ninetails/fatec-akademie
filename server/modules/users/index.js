var express = require('express');
var app = express();
var User = require('./models/user.js');

app.post('/login', (req, res) => {
  // console.log(req.origin);

  if (!req.body.user || !req.body.pass) {
    res.jsonp({
      error: {
        errno: 1,
        err: "Blank credentials"
      }
    });
  }

  User.findOne({username: req.body.user}, (err, user) => {
    if (!!err) throw err;

    if (!user) {
      res.jsonp({
        error: {
          errno: 2,
          err: "Wrong credentials"
        }
      });
    } else {
      user.comparePassword(req.body.pass, (err, isMatch) => {
        if (err) throw err;

        if (!isMatch) {
          res.jsonp({
            error: {
              errno: 2,
              err: "Wrong credentials"
            }
          });
        } else {
          res.jsonp({
            error: null,
            user: user
          });
        }
      });
    }
  });
});

module.exports = app;
