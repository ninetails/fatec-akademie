var express = require('express');
var app = express();
var User = require('./models/user.js');

app.post('/login', (req, res) => {
  // console.log(req.origin);

  if (!req.body.user || !req.body.pass) {
    res.jsonp({
      error: {
        errno: 1,
        msg: "Blank credentials"
      }
    });

    return res.end();
  }

  User.findOne({username: req.body.user}, '_id username password first_name measure type created_at last_sync sync_key', (err, user) => {
    if (!!err) throw err;

    if (!user) {
      res.jsonp({
        error: {
          errno: 2,
          msg: "Wrong credentials"
        }
      });

      return res.end();
    }

    user.comparePassword(req.body.pass, (err, isMatch) => {
      if (err) throw err;

      if (!isMatch) {
        res.jsonp({
          error: {
            errno: 2,
            msg: "Wrong credentials"
          }
        });

        return res.end();
      }

      var out = user.toObject();
      delete out['password'];

      res.jsonp({
        error: null,
        user: out
      });

      res.end();
    });

  });
});

app.post('/signup', (req, res) => {
  var requiredFields = ['username', 'password', 'email', 'first_name'];
  var data = {};

  for (var key in req.body) {
    data[key] = req.body[key].trim();
  }

  requiredFields.forEach((field) => {
    if (!data[field]) {
      res.jsonp({
        error: {
          errno: 1,
          msg: "Sent blank required field"
        }
      });

      return res.end();
    }
  });

  if (data.password.length < 6) {
    res.jsonp({
      error: {
        errno: 2,
        msg: "Password needs to be 6 characters long at least"
      }
    });

    return res.end();
  }

  var newUser = new User(data);
  newUser.save((err) => {
    if (!!err && err.name === 'ValidationError') {
      res.jsonp({
        error: {
          errno: 3,
          error: err
        }
      });
      return res.end();
    }

    var userObj = newUser.toObject();
    delete userObj['__v'];
    delete userObj['password'];
    res.jsonp({
      error: null,
      success: "User successfully created",
      user: newUser.toObject()
    });
    return res.end();

  });

});

module.exports = app;
