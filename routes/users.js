const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const User = require('../models/user');


/* 
Creates a new user
*/
router.post('/' , async (req, res) => {
  let user = await User.findOne({userName: req.body.userName});
  if(user) return res.status(400).send('Username already taken');

  user = new User({userName: req.body.userName, score: 0});

  await user.save();

  res.send(user);
});


module.exports = router;