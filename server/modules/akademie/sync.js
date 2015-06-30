var async = require('async');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = require('../users/models/user');
var Measure = require('./models/measure');
var Training = require('./models/training');

module.exports = (req, res) => {
  var userId = new ObjectId(req.body.user._id);

  async.waterfall([
    (callback) => {
      User.findOne({ "_id": userId}, callback);
    },
    (user, callback) => {
      user.measure = req.body.user.measure;
      user.save((err) => {
        if (!!err) callback(err);
        callback(null, user);
      });
    }
  ], (err, result) => {
    if (!!err) console.log(err);
    console.log(result);
  });

  res.jsonp({
    error: null,
    body: req.body
  });

  return res.end();
};
