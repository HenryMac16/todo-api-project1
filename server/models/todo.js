var mongoose = require('mongoose');
//this is a working mongoose model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLength: 1, //catches empty string input
    trim: true //trims all of the leading and trailing whitespace

  },
  completed: {
    type: Boolean,
    default: false

  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
