/**
 * Using login from:
 * http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
 */

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 99;

var userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true }, lowercase: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  first_name: String,
  last_name: String,
  // data: {},
  measure: Schema.Types.Mixed,
  password: { type: String },
  type: { type: String, default: 'user' },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date },
  last_sync: { type: Date },
  sync_key: String
});

userSchema.pre('save', (next) => {
  var user = this;

  // updated_at
  this.updated_at = new Date();

  // password
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = (candidate, cb) => {
  bcrypt.compare(candidate, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

var User = module.exports = mongoose.model("User", userSchema);

User.schema.path('username').validate((value) => {
  return /^([\W\-\.\_]+)$/i.test(value);
}, 'Nome de usuário inválido');

User.schema.path('username').validate((value, respond) => {
  User.findOne({username: value}, (err, user) => {
    if (!!user) respond(false);
  });
}, 'Nome de usuário já existe');

User.schema.path('email').validate((value, respond) => {
  return /^([\W\-\_]+\.?)+@(\.[\W\-\_]+)+$/.test(value);
}, 'Email inválido.');

User.schema.path('email').validate((value, respond) => {
  User.findOne({email: value}, (err, user) => {
    if (!!user) respond(false);
  });
}, 'Email já registrado, insira um outro email');
