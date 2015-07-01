var User = require('./models/user');

module.exports = (req, res) => {
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
    res.jsonp({
      error: null,
      success: "User successfully created",
      user: {
        _id:        userObj._id,
        username:   userObj.username,
        first_name: userObj.first_name,
        last_name:  userObj.last_name,
        type:       userObj.type,
        measure:    userObj.measure,
        created_at: userObj.created_at
      }
    });
    return res.end();

  });

};
