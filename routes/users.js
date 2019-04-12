const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', async (req, res) => {
  req.user._id
})

router.post('/', async (req, res) => {
  /* Validate request, if not valid, send 400, if it is, save to db */

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user exists. findOne returns a promise
  let user = await User.findOne({ email: req.body.email });
  
  // if user exists, send bad request, user already registered
  if (user) return res.status(400).send('User already exists');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  //_.pick returns the object with only the props passed in array
  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

  res.header("x-auth-token", token).send(_.pick(user, ['_id','name', 'email']));
  // res.send(user);


});

module.exports = router;