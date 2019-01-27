const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});
//arrow functions do not bind a this keyword
UserSchema.methods.toJSON = function () { //determined what gets sent back
  var user = this;
  var userObject = user.toObject(); //takes mongoose variable, converts to regular ObjectID

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]); //similar to .push();

  return user.save().then(() => {
    return token;
  });
};
//model, not instance method
UserSchema.statics.findByToken = function (token) { //called as the model with the this binding
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject(); //value passed in would get bassed in as the e value in catch
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token, //quotes required with a . in the value
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User}
