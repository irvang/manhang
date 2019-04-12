const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  /* Validate request, if not valid, send 400, if it is, save to db */

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user exists. findOne returns a promise
  let user = await User.findOne({ email: req.body.email });

  // if user exists, send bad request, user already registered
  if (!user) return res.status(400).send('Invalid email or password');

  //compare plain text password with hash password (plain, hashed)
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  //input is (payload, key)
  const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey')

  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}


module.exports = router;