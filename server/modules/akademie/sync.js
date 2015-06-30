var assign = Object.assign || require('object.assign');
var async = require('async');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = require('../users/models/user');
var Measure = require('./models/measure');
var Training = require('./models/training');

module.exports = (req, res) => {
  var today = Date.now;
  var userId = new ObjectId(req.body.user._id);

  async.waterfall([
    (callback) => {
      User.findByIdAndUpdate({ "_id": userId, last_sync: today }, { $set: { measure: req.body.user.measure } }, callback);
    },
    (user, callback) => {
      var tasks = [];

      req.body.measures.forEach((el, idx, arr) => {
        tasks.push((callback) => {
          assign(new Measure(), el, { created_by: user._id }).save(callback);
        });
      });

      req.body.trainings.forEach((el, idx, arr) => {
        tasks.push((callback) => {
          assign(new Training(), el, { created_by: user._id }).save(callback);
        });
      });

      async.parallel(tasks, callback);
    }
  ], (err, result) => {
    if (!!err) {console.log(err);
      res.jsonp({
        error: {
          errno: 1,
          msg: "Error has occurred."
        }
      });

      return res.end();
    }

    var out = {
      error: null,
      user: { last_sync: today },
      measures: [],
      trainings: []
    };

    result.forEach((el, idx, arr) => {
      if (el instanceof Measure) {
        out.measures.push(el);
      }

      if (el instanceof Training) {
        out.trainings.push(el);
      }

    });

    res.jsonp(out);
    return res.end();
  });

};
