const mongoose = require('mongoose');
// const Joi = require('joi');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  score: {
    type: Number,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;