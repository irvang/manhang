const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  /* Validate request, if not valid, send 400, if it is, save to db */

  console.log('hit route')
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user exists. findOne returns a promise
  let user = await User.findOne({ email: req.body.email });

  console.log(req.body.password);

  // if user exists, send bad request, user already registered
  if (user) return res.status(400).send('User already exists');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // });

  await user.save();

  //_.pick returns the object with only the props passed in array
  res.send(_.pick(user, ['_id','name', 'email']));


});

module.exports = router;