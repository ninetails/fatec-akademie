var User = require('./models/user');

module.exports = (req, res) => {
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
};
